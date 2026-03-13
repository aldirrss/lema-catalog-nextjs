'use client';
/**
 * ForumDiscuss
 * ------------
 * Full forum discussion component.
 * - List threads with module tags
 * - Create new thread with module tag autocomplete
 * - Reply to threads (nested one level)
 * - Visitor identity stored in sessionStorage (no login)
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { DiscussThread, DiscussReply } from '@/types/discuss';
import { useDiscussSession } from '@/hooks/useDiscussSession';
import { useLang } from '../layout/LangProvider';

// ─── helpers ──────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string, t: any): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function Avatar({ name, size = 8 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  const colors = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500',
    'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-red-500',
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={`${color} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}
      style={{ width: `${size * 4}px`, height: `${size * 4}px`, fontSize: `${size * 1.5}px` }}
    >
      {initials}
    </div>
  );
}

// ─── Identity / Session Form ───────────────────────────────────────────────

function IdentityBar({
  session,
  onSet,
  onClear,
}: {
  session: { name: string; email: string } | null;
  onSet: (s: { name: string; email: string }) => void;
  onClear: () => void;
}) {
  const { t } = useLang();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(session?.name ?? '');
  const [email, setEmail] = useState(session?.email ?? '');

  useEffect(() => {
    setName(session?.name ?? '');
    setEmail(session?.email ?? '');
  }, [session]);

  const save = () => {
    if (!name.trim()) return;
    onSet({ name: name.trim(), email: email.trim() });
    setEditing(false);
  };

  if (session && !editing) {
    return (
      <div
        className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-4"
        style={{ background: 'var(--bg-inline-card)', border: '1px solid var(--border-card)' }}
      >
        <Avatar name={session.name} size={7} />
        <span style={{ color: 'var(--text-secondary)' }}>
          {t.forum.identity.postingAs} <strong style={{ color: 'var(--text-primary)' }}>{session.name}</strong>
          {session.email && (
            <span className="ml-1" style={{ color: 'var(--text-muted)' }}>
              ({session.email})
            </span>
          )}
        </span>
        <button
          onClick={() => setEditing(true)}
          className="ml-auto text-xs underline"
          style={{ color: 'var(--brand-accent)' }}
        >
          {t.forum.identity.change}
        </button>
        <button
          onClick={onClear}
          className="text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl p-4 mb-4"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)' }}
    >
      <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
        {session ? t.forum.identity.updateIdentity : t.forum.identity.whoAreYou}
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          className="discuss-input flex-1"
          placeholder={t.forum.identity.yourName}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && save()}
        />
        <input
          className="discuss-input flex-1"
          placeholder={t.forum.identity.emailOptional}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && save()}
        />
        <button
          onClick={save}
          disabled={!name.trim()}
          className="discuss-btn-primary shrink-0"
        >
          {t.forum.identity.save}
        </button>
        {session && (
          <button
            onClick={() => setEditing(false)}
            className="discuss-btn-ghost shrink-0"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

// ─── New Thread Form ───────────────────────────────────────────────────────────

function NewThreadForm({
  session,
  onCreated,
}: {
  session: { name: string; email: string } | null;
  onCreated: (thread: DiscussThread) => void;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!title.trim() || !body.trim() || !session) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/discuss/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          author_name: session.name,
          author_email: session.email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onCreated(data.data);
        setTitle('');
        setBody('');
        setOpen(false);
      } else {
        setError(data.error ?? 'Failed to post thread.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="discuss-btn-primary w-full"
        disabled={!session}
        title={!session ? 'Set your name first' : ''}
      >
        + {t.forum.startDiscussion}
      </button>
    );
  }

  return (
    <div
      className="rounded-2xl p-5 space-y-3"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-card)' }}
    >
      <input
        className="discuss-input w-full"
        placeholder={t.forum.newThread.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="discuss-input w-full resize-none"
        rows={4}
        placeholder={t.forum.newThread.body}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => setOpen(false)}
          className="discuss-btn-ghost"
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          onClick={submit}
          className="discuss-btn-primary"
          disabled={submitting || !title.trim() || !body.trim()}
        >
          {submitting ? t.forum.newThread.posting : t.forum.post}
        </button>
      </div>
    </div>
  );
}

// ─── Reply Form ────────────────────────────────────────────────────────────────

function ReplyForm({
  threadId,
  parentReplyId,
  session,
  onPosted,
  onCancel,
  autoFocus,
}: {
  threadId: number;
  parentReplyId?: number;
  session: { name: string; email: string } | null;
  onPosted: (reply: DiscussReply) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
}) {
  const { t } = useLang();
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  const submit = async () => {
    if (!body.trim() || !session) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`/api/discuss/threads/${threadId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: body.trim(),
          author_name: session.name,
          author_email: session.email,
          parent_reply_id: parentReplyId ?? null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onPosted(data.data);
        setBody('');
        onCancel?.();
      } else {
        setError(data.error ?? 'Failed to post reply.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      {session && <Avatar name={session.name} size={7} />}
      <div className="flex-1 space-y-1.5">
        <textarea
          ref={ref}
          rows={2}
          className="discuss-input w-full resize-none"
          placeholder={session ? t.forum.thread.writeReply : t.forum.thread.setIdentityToReply}
          value={body}
          disabled={!session}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit();
          }}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <div className="flex gap-2 justify-end">
          {onCancel && (
            <button onClick={onCancel} className="discuss-btn-ghost text-xs py-1 px-2">
              Cancel
            </button>
          )}
          <button
            onClick={submit}
            disabled={submitting || !body.trim() || !session}
            className="discuss-btn-primary text-xs py-1 px-3"
          >
            {submitting ? t.forum.newThread.posting : `↵ ${t.forum.reply}`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Single Thread Card ────────────────────────────────────────────────────────

function ThreadCard({
  thread: initialThread,
  session,
  defaultOpen,
}: {
  thread: DiscussThread;
  session: { name: string; email: string } | null;
  defaultOpen?: boolean;
}) {
  const { t } = useLang();
  const [thread, setThread] = useState(initialThread);
  const [expanded, setExpanded] = useState(defaultOpen ?? false);
  const [replyingTo, setReplyingTo] = useState<number | 'root' | null>(null);

  const addReply = (reply: DiscussReply) => {
    setThread((t) => ({
      ...t,
      replies: [...t.replies, reply],
      reply_count: t.reply_count + 1,
    }));
    setReplyingTo(null);
  };

  // Group replies: top-level and children
  const topReplies = thread.replies.filter((r) => !r.parent_reply_id);
  const childReplies = (parentId: number) =>
    thread.replies.filter((r) => r.parent_reply_id === parentId);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${thread.pinned ? 'var(--brand-accent)' : 'var(--border-card)'}`,
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Header */}
      <button
        className="w-full text-left px-5 py-4 flex items-start gap-3"
        onClick={() => setExpanded((v) => !v)}
      >
        <Avatar name={thread.author_name} size={9} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {thread.pinned && (
              <span
                className="text-xs px-1.5 py-0.5 rounded font-medium"
                style={{ background: 'var(--brand-accent)', color: '#fff' }}
              >
                📌 {t.forum.thread.pinned}
              </span>
            )}
            {thread.state === 'closed' && (
              <span
                className="text-xs px-1.5 py-0.5 rounded font-medium"
                style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}
              >
                🔒 {t.forum.thread.closed}
              </span>
            )}
          </div>
          <h3 className="font-semibold mt-0.5 leading-snug" style={{ color: 'var(--text-primary)' }}>
            {thread.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs flex-wrap" style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>{thread.author_name}</span>
            <span>·</span>
            <span>{timeAgo(thread.created_date, t)}</span>
            <span>·</span>
            <span>{thread.reply_count} {thread.reply_count === 1 ? t.forum.reply : t.forum.replies}</span>
          </div>
        </div>
        <span
          className="text-sm shrink-0 mt-1 transition-transform"
          style={{
            color: 'var(--text-muted)',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▾
        </span>
      </button>

      {/* Expanded body + replies */}
      {expanded && (
        <div className="px-5 pb-5 border-t" style={{ borderColor: 'var(--border-card)' }}>
          <p
            className="mt-4 text-sm leading-relaxed whitespace-pre-wrap"
            style={{ color: 'var(--text-secondary)' }}
          >
            {thread.body}
          </p>

          {/* Replies */}
          {topReplies.length > 0 && (
            <div className="mt-5 space-y-3">
              {topReplies.map((reply) => (
                <div key={reply.id}>
                  <div className="flex gap-2.5">
                    <Avatar name={reply.author_name} size={7} />
                    <div className="flex-1">
                      <div
                        className="rounded-xl px-3.5 py-2.5"
                        style={{ background: 'var(--bg-surface)' }}
                      >
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {reply.author_name}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {timeAgo(reply.created_date, t)}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
                          {reply.body}
                        </p>
                      </div>
                      {/* Reply-to-reply button */}
                      {thread.state === 'open' && (
                        <button
                          className="text-xs mt-1 ml-1"
                          style={{ color: 'var(--brand-accent)' }}
                          onClick={() =>
                            setReplyingTo((v) => (v === reply.id ? null : reply.id))
                          }
                        >
                          ↩ {t.forum.reply}
                        </button>
                      )}
                      {replyingTo === reply.id && (
                        <ReplyForm
                          threadId={thread.id}
                          parentReplyId={reply.id}
                          session={session}
                          onPosted={addReply}
                          onCancel={() => setReplyingTo(null)}
                          autoFocus
                        />
                      )}
                      {/* Nested children */}
                      {childReplies(reply.id).length > 0 && (
                        <div className="ml-4 mt-2 space-y-2 pl-3 border-l-2" style={{ borderColor: 'var(--border-card)' }}>
                          {childReplies(reply.id).map((child) => (
                            <div key={child.id} className="flex gap-2">
                              <Avatar name={child.author_name} size={6} />
                              <div
                                className="flex-1 rounded-xl px-3 py-2"
                                style={{ background: 'var(--bg-surface)' }}
                              >
                                <div className="flex items-baseline gap-2 mb-0.5">
                                  <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                                    {child.author_name}
                                  </span>
                                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                    {timeAgo(child.created_date, t)}
                                  </span>
                                </div>
                                <p className="text-xs whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
                                  {child.body}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Root reply form */}
          {thread.state === 'open' && (
            <div className="mt-4">
              {replyingTo === 'root' ? (
                <ReplyForm
                  threadId={thread.id}
                  session={session}
                  onPosted={addReply}
                  onCancel={() => setReplyingTo(null)}
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => setReplyingTo('root')}
                  className="discuss-btn-ghost text-sm w-full"
                  disabled={!session}
                >
                  {session ? `↩ ${t.forum.thread.writeReply}` : t.forum.thread.setIdentityToReply}
                </button>
              )}
            </div>
          )}

          {thread.state === 'closed' && (
            <p className="mt-4 text-xs text-center" style={{ color: 'var(--text-muted)' }}>
              {t.forum.thread.closedMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Forum Component ──────────────────────────────────────────────────────

export default function ForumDiscuss() {
  const { t } = useLang();
  const { session, setSession, clearSession, loaded } = useDiscussSession();
  const [threads, setThreads] = useState<DiscussThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/discuss/threads');
      const data = await res.json();
      if (data.success) setThreads(data.data);
      else setError('Failed to load threads.');
    } catch {
      setError('Network error. Could not load discussions.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreated = (thread: DiscussThread) => {
    setThreads((prev) => [thread, ...prev]);
  };

  return (
    <>
      {/* Scoped styles */}
      <style>{`
        .discuss-input {
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 14px;
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.15s;
        }
        .discuss-input:focus {
          border-color: var(--brand-accent);
        }
        .discuss-input::placeholder {
          color: var(--text-muted);
        }
        .discuss-btn-primary {
          background: var(--brand-primary);
          color: var(--text-inverse);
          border: none;
          border-radius: 10px;
          padding: 8px 18px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .discuss-btn-primary:hover:not(:disabled) { opacity: 0.88; }
        .discuss-btn-primary:disabled { opacity: 0.45; cursor: default; }
        .discuss-btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-card);
          border-radius: 10px;
          padding: 8px 14px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .discuss-btn-ghost:hover:not(:disabled) { background: var(--bg-surface); }
        .discuss-btn-ghost:disabled { opacity: 0.45; cursor: default; }
      `}</style>

      <div className="space-y-4">
        {/* Identity Bar */}
        {loaded && (
          <IdentityBar
            session={session}
            onSet={setSession}
            onClear={clearSession}
          />
        )}

        {/* New Thread */}
        <NewThreadForm session={session} onCreated={handleCreated} />

        {/* Threads */}
        <div className="space-y-3">
          {loading && (
            <div className="text-center py-8 text-sm" style={{ color: 'var(--text-muted)' }}>
              {t.common.loading}
            </div>
          )}
          {!loading && error && (
            <div className="text-center py-8 text-sm text-red-500">{error}</div>
          )}
          {!loading && !error && threads.length === 0 && (
            <div
              className="text-center py-12 rounded-2xl"
              style={{ background: 'var(--bg-surface)', border: '1px dashed var(--border-card)' }}
            >
              <div className="text-4xl mb-3">💬</div>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {t.forum.noDiscussions}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                {t.forum.noDiscussionsDesc}
              </p>
            </div>
          )}
          {!loading && threads.map((t) => (
            <ThreadCard
              key={t.id}
              thread={t}
              session={session}
            />
          ))}
        </div>
      </div>
    </>
  );
}

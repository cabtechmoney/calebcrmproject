'use client';

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="auth-loading" role="alert">
      <p>We couldn&apos;t load this page. {error.message || 'Please try again.'}</p>
      <button className="primary-button" onClick={() => unstable_retry()}>Try again</button>
    </main>
  );
}
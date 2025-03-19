import { Link } from 'react-router'

export default function Index() {
  return (
    <main
      className={`
        min-w-screen min-h-screen
        flex flex-col items-center justify-center
      `}
    >
      <h1 className={`text-6xl font-bold`}>Welcome!</h1>
      <img
        src="/image/logo-bg-beige.png"
        alt="full logo"
        width="512"
        height="512"
        className={`
          my-8
          rounded-full border-8 border-tan
        `}
      />
      <Link
        to="/demo"
        prefetch="render"
        className={`
          text-5xl font-semibold
          hover:underline
          text-grape
          dark:text-gold
        `}
      >
        Demonstrations →
      </Link>
    </main>
  )
}

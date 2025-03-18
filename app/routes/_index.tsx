export default function Index() {
  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <img
        src="/image/logo-bg-beige.png"
        alt="full logo"
        width="512"
        height="512"
        className="my-8 rounded-full border-8 border-tan"
      />
      <a
        href="/demo"
        className="text-lg font-semibold bg-grape text-white px-4 py-2 rounded-lg"
      >
        Demonstrations
      </a>
    </div>
  )
}

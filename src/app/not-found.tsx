import Link from 'next/link'

export default function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center gap-3">
      <h2 className=" text-2xl text-sky-600">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className=" rounded-2xl bg-amber-300 px-3 py-1" href="/">
        Return Home
      </Link>
    </div>
  )
}

// @ts-nocheck

import { Link } from 'react-router'
import { brandColors, defaultColors, bg } from '~/lexica/tailwind'

const tw = { bg }

export default function DemoColors() {
  return (
    <div className="p-4">
      <Link
        to="/demo"
        prefetch="render"
        className={`
            text-2xl font-semibold
            hover:underline
            text-grape
            dark:text-gold
          `}
      >
        ← Demo Index
      </Link>
      <h2
        className={`
          my-2
          text-5xl font-bold
        `}
      >
        Colors
      </h2>
      <div className="p-4">
        <h3
          className={`
            my-2
            text-4xl font-bold
          `}
        >
          Brand Custom Colors
        </h3>
        {brandColors.map((color) => {
          const colorShades = Object.keys(tw.bg[color])
          return (
            <div
              key={color}
              className="p-4 max-w-[1024px] flex flex-col gap-y-2"
            >
              <div className="flex items-center gap-x-4">
                <div
                  className={`h-12 w-12 rounded-md border-2 border-black dark:border-white ${tw.bg[color][500][100]}`}
                ></div>
                <h4
                  className={`
                    my-2
                    text-3xl font-bold
                  `}
                >
                  {color}
                </h4>
              </div>
              <div className="w-full flex">
                {colorShades.map((shade) => (
                  <div
                    key={shade}
                    className="grow flex flex-col"
                  >
                    <div
                      className={`
                        h-6
                        text-center
                        ${shade === '500' ? 'font-bold' : ''}
                      `.trim()}
                    >
                      {shade}
                    </div>
                    <div className={`h-12 ${tw.bg[color][shade][100]}`}></div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
        <h3
          className={`
            mt-6 mb-2
            text-4xl font-bold
          `}
        >
          Tailwind Default Colors
        </h3>
        {defaultColors.map((color) => {
          const colorShades = Object.keys(tw.bg[color])
          const isBlackOrWhite = color === 'black' || color === 'white'
          return (
            <div
              key={color}
              className="p-4 max-w-[1024px] flex flex-col gap-y-2"
            >
              <div className="flex items-center gap-x-4">
                <div
                  className={`h-12 w-12 rounded-md border-2 ${
                    isBlackOrWhite
                      ? `border-neutral-500 ${tw.bg[color][100]}`
                      : `border-black dark:border-white ${tw.bg[color][500][100]}`
                  }`}
                ></div>
                <h4
                  className={`
                    my-2
                    text-3xl font-bold
                  `}
                >
                  {color}
                </h4>
              </div>
              {isBlackOrWhite ? (
                <div className={`w-full h-12 ${tw.bg[color][100]}`}></div>
              ) : (
                <div className="w-full flex">
                  {colorShades.map((shade) => (
                    <div
                      key={shade}
                      className="grow flex flex-col"
                    >
                      <div
                        className={`
                        h-6
                        text-center
                        ${shade === '500' ? 'font-bold' : ''}
                      `.trim()}
                      >
                        {shade}
                      </div>
                      <div className={`h-12 ${tw.bg[color][shade][100]}`}></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// @ts-nocheck

import { Link } from 'react-router'
import { brandColors, defaultColors, bg } from '~/lexica/tailwind'

const tw = { bg }

export default function DemoColorIndex() {
  return (
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
        const colorShades = Object.keys(tw.bg[color]).filter(
          (k) => k !== 'default'
        )
        return (
          <div
            key={color}
            className="p-4 max-w-[1024px] flex flex-col gap-y-2"
          >
            <div className="flex items-center gap-x-4">
              <div
                className={`h-12 w-12 rounded-full border-2 border-black dark:border-white ${tw.bg[color].default[100]}`}
              ></div>
              <h4
                className={`
                    my-2
                    text-3xl font-bold
                  `}
              >
                <Link
                  to={`/demo/color/${color}`}
                  prefetch="render"
                  className={`
                    hover:underline
                    text-grape
                    dark:text-gold
                  `}
                >
                  {color} →
                </Link>
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
        const colorShades = Object.keys(tw.bg[color]).filter(
          (k) => k !== 'default'
        )
        const isBlackOrWhite = color === 'black' || color === 'white'
        return (
          <div
            key={color}
            className="p-4 max-w-[1024px] flex flex-col gap-y-2"
          >
            <div className="flex items-center gap-x-4">
              <div
                className={`h-12 w-12 rounded-full border-2 ${
                  tw.bg[color].default[100]
                } ${
                  isBlackOrWhite
                    ? `border-neutral-500`
                    : `border-black dark:border-white`
                }`}
              ></div>
              <h4
                className={`
                    my-2
                    text-3xl font-bold
                  `}
              >
                <Link
                  to={`/demo/color/${color}`}
                  prefetch="render"
                  className={`
                    hover:underline
                    text-grape
                    dark:text-gold
                  `}
                >
                  {color} →
                </Link>
              </h4>
            </div>
            {isBlackOrWhite ? (
              <div className={`w-full h-12 ${tw.bg[color].default[100]}`}></div>
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
  )
}

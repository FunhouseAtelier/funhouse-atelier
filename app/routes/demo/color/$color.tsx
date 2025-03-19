// @ts-nocheck

import { useParams } from 'react-router'
import { brandColors, defaultColors, bg } from '~/lexica/tailwind'
import { Link } from 'react-router'

const tw = { bg }

const opacityBreakpoints = [
  100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10,
  5, 0,
]

export default function DemoColorShow() {
  const { color } = useParams()
  const isNotRecognized =
    !brandColors.includes(color) && !defaultColors.includes(color)
  const isBlackOrWhite = color === 'black' || color === 'white'
  const colorShades = Object.keys(tw.bg[color]).filter((k) => k !== 'default')
  return (
    <div className="p-4">
      <Link
        to="/demo/color"
        prefetch="render"
        className={`
          text-2xl font-semibold
          hover:underline
          text-grape
          dark:text-gold
        `}
      >
        ← Colors Index
      </Link>
      <h3
        className={`
        my-2
        text-4xl font-bold
      `}
      >
        {color}
      </h3>
      {isNotRecognized ? (
        <div className="text-xl">is not a recognized color</div>
      ) : (
        <>
          <div className="mt-4 p-4 max-w-[1024px] flex flex-col bg-black text-white">
            <div className="flex">
              <div className="w-16"></div>
              {colorShades.map((shade) => (
                <div
                  className={`
                    h-6 grow
                    text-center
                    ${shade === '500' ? 'font-bold' : ''}
                  `.trim()}
                >
                  {shade}
                </div>
              ))}
            </div>
            {opacityBreakpoints.map((opacity) => (
              <div
                key={opacity}
                className="flex"
              >
                <div className="w-16 text-center">{opacity}%</div>
                {isBlackOrWhite ? (
                  <div
                    className={`w-full h-6 ${tw.bg[color].default[opacity]}`}
                  ></div>
                ) : (
                  <div className="w-full flex">
                    {colorShades.map((shade) => (
                      <div
                        key={shade}
                        className={`grow h-6 ${tw.bg[color][shade][opacity]}`}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mb-4 p-4 max-w-[1024px] flex flex-col bg-white text-black">
            {opacityBreakpoints.toReversed().map((opacity) => (
              <div
                key={opacity}
                className="flex"
              >
                <div className="w-16 text-center">{opacity}%</div>
                {isBlackOrWhite ? (
                  <div
                    className={`w-full h-6 ${tw.bg[color].default[opacity]}`}
                  ></div>
                ) : (
                  <div className="w-full flex">
                    {colorShades.map((shade) => (
                      <div
                        key={shade}
                        className={`grow h-6 ${tw.bg[color][shade][opacity]}`}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex">
              <div className="w-16"></div>
              {colorShades.map((shade) => (
                <div
                  className={`
                    h-6 grow
                    text-center
                    ${shade === '500' ? 'font-bold' : ''}
                  `.trim()}
                >
                  {shade}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

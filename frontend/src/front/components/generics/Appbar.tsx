import { Link } from "react-router-dom"

import { Icon } from "../custom/Icon"

import { useToggleTheme } from "../../hooks/ThemeContext"
import { useColors } from "../../hooks/useColors"

import "../../styles/Appbar.css"
import "../../styles/colors.css"

const rightButtons = [
  {
    name: "home",
    to: "",
  },
  {
    name: "contact",
    to: "contact",
  },
]

export const Appbar = () => {
  const toggleTheme = useToggleTheme()
  const colors = useColors()

  return (
    <div
      className="Appbar"
      style={{
        backgroundColor: colors.primaryColor,
      }}
    >
      <button onClick={toggleTheme || undefined}>Toggle</button>
      <Icon name="moon" />
      <ul>
        {rightButtons.map((button) => (
          <li key={button.name}>
            <Link
              className="Link"
              to={button.to}
              style={{
                color: colors.secondaryColor,
              }}
            >
              {button.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

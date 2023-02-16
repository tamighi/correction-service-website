import React from "react"

import { Divider, Drawer, IconButton, MenuIcon } from "lib"

import { useLocation, useNavigate } from "react-router-dom"

import "./AppbarDrawer.css"

interface AppbarDrawerProps {
  navItems: { name: string; to: string }[]
}

export const AppbarDrawer = ({ navItems }: AppbarDrawerProps) => {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const onClick = (to: string) => {
    setOpen(false)
    navigate(to)
  }

  return (
    <div className="MobileAppbar">
      <IconButton onClick={() => setOpen(!open)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <ul className="DrawerLinkList">
          <li>
            Menu
            <Divider />
          </li>
          {navItems.map((button, id) => (
            <li key={id}>
              <button onClick={() => onClick(button.to)} className="DrawerLink">
                {button.name}
                <img
                  alt=""
                  src={"./images/feather.png"}
                  style={{
                    height: "64px",
                    visibility:
                      button.to === location.pathname ? "visible" : "hidden",
                  }}
                ></img>
              </button>
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  )
}
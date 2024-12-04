import React, { useEffect, useState, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { SelectOutlined } from "@ant-design/icons"
import { CSSTransition } from "react-transition-group"
import "./index.css"

export default function Header() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const routes = {
    "/": "首頁",
    "/calculator": "食物計算機",
    "/food": "營養指南",
    "/bird": "百科全書",
    "/hospital": "醫護站",
    "/connect": "聯繫我們"
  }
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])
  return (
    <div>
      <Link to="/" className="logo fixed left-5 top-2 w-[32px] lg:w-[40px]">
        <img src="/logo.png" alt="logo" className="pic-auto" />
      </Link>

      <div className="relative">
        {/* 選單按鈕 */}

        {!menuOpen && (
          <button onClick={() => setMenuOpen(true)} className="nav-btn">
            <SelectOutlined />
            <div>{routes[pathname]}</div>
          </button>
        )}

        {/* 選單 */}
        {menuOpen && (
          <div class="nav-menu">
            <button className="nav-menu-item" onClick={() => setMenuOpen(false)}>
              CLOSE
            </button>
            <Link className="nav-menu-item" exact-active-class="bg-blue4 bg-opacity-15" to="/">
              首頁
            </Link>
            <Link
              className="nav-menu-item"
              exact-active-class="bg-blue4 bg-opacity-15"
              to="/calculator"
            >
              食物計算機
            </Link>
            <Link className="nav-menu-item" exact-active-class="bg-blue4 bg-opacity-15" to="/food">
              營養指南
            </Link>
            <Link className="nav-menu-item" exact-active-class="bg-blue4 bg-opacity-15" to="/bird">
              百科全書
            </Link>
            <Link
              className="nav-menu-item"
              exact-active-class="bg-blue4 bg-opacity-15"
              to="/hospital"
            >
              醫護站
            </Link>
            <Link
              className="nav-menu-item"
              exact-active-class="bg-blue4 bg-opacity-15"
              to="/connect"
            >
              聯繫我們
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

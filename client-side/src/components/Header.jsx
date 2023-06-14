/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./Navbar"
import { useEffect } from "react"
import { getCategories } from "../actions/category"
import { NavLink } from "react-router-dom"

export default function Header() {
  const { categories } = useSelector(state => state.categories)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <>
        <Navbar />
        <ul className="flex justify-center gap-4 font-bold mt-3">
          {
            categories.map(category => {
              return (
                <li key={category.id}>
                  <NavLink to="/">{category.name}</NavLink>
                </li>
              )
            })
          }
        </ul>
        <div className="max-w-screen-lg mx-auto flex flex-row justify-between mb-9 pt-4">
          <div className="border-t border-l border-b w-[250px] flex flex-row items-center font-semibold text-red-400 justify-center">
            Trending
          </div>
          <div className="border-t border-l border-b w-full flex flex-row items-center justify-start pl-4">
            Ini adalah berita trending hari ini
          </div>
          <div className="flex flex-row gap-4 text-2xl px-4 py-1 border">
            <div>&lt;</div>
            <div>&gt;</div>
          </div>
        </div>
        <div className="flex  text-xl">
          <div className="w-1/5 border-r-2 border-black">NEWS</div>
          <div className="w-4/5 flex gap-4 px-4">
            <span>ALL</span>
            <span>INDONESIA</span>
            <span>WORLD</span>
          </div>
        </div>
        <hr className="border mt-2" />
    </>
  )
}

import { Links } from "./Links"
import "./sidebar.css"

export const Sidebar = ({setTheme,theme}) => {
  const handleTheme = () => {
    setTheme((p) => (p === "light" ? "dark" : "light"));
  }; 
  return ( 
    <div className="sidebar">
      <Links classname="sidelinks" handleTheme={handleTheme} theme={theme}/>
    </div>
  )
}

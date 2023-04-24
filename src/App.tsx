import { Routes, Route } from 'react-router-dom'
import MyLayout from "./components/MyLayout"


function App() {

  return (
    <MyLayout>
      <Routes>

      </Routes>
    </MyLayout>
  )
}

export default App

// 这个App.tsx应该是用作路由的，但是三种角色的路由写在一起太乱了，所以我拆成了
// 三个路由文件AdminRoutes.tsx ,ProviderRoutes.tsx, CustomerRoutes.tsx
// 三个角色的路由写在各自的文件吧，不知道这样做是不是最合适，但先这样分开写，
// 之后有需要再合并。
// 
// 陈昊 4.18
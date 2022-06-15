import React, { useEffect, useState } from 'react'
import style from './Style.module.css'
export const ComplexDragAndDrop = () => {
 
   const [currentBoard, setCurrentBoard] = useState(null)
   const [currentItem, setCurrentItem] = useState(null)


   const [boards, setBoards] = useState([
     {
      id: 1,
      title: 'Сделать',
      items: [
         {
            id: 1,
            title:"Пойти в магазин",
         },
         {
            id: 2,
            title:"Вынести мусор",
         },
         {
            id: 3,
            title:"Покушать",
         },
      ]
     },
     {
      id: 2,
      title: 'Делается',
      items: [
         {
            id: 1,
            title:"Пойти в магазин",
         },
         {
            id: 2,
            title:"Смонтировать видео",
         },
         {
            id: 3,
            title:"Покушать",
         },
      ]
     },
     {
      id: 3,
      title: 'Сделано',
      items: [
         {
            id: 1,
            title:"Задача по факториалам",
         },
         {
            id: 2,
            title:"Вынести мусор",
         },
         {
            id: 3,
            title:"Покушать",
         },
      ]
     }
   ])


   const dragStartHandler = (e, board, item) => {
      setCurrentBoard(board)
      setCurrentItem(item)

   }

   const dragEndHandler = (e) => {
      // console.log('dragEndHandler',e)
      e.target.style.boxShadow = 'none'

      
   }

   const dragLeaveHandler = (e) => {
      // console.log('dragLeaveHandler',e)
      e.target.style.boxShadow = 'none'

      
   }

   const dragOverHandler = (e, ) => {
      e.preventDefault()
      console.log('e.target.classList.contain',e.target.classList.contains(style.item))
      if(e.target.classList.contains(style.item)){
         e.target.style.boxShadow = '0 2px 3px gray'
         
      }
      
   }

   const dropHandler = (e, board, item) => {
      e.stopPropagation()

      e.preventDefault()
      e.target.style.boxShadow = 'none'
  
      const currentIndex = currentBoard.items.indexOf(currentItem)

      currentBoard.items.splice(currentIndex, 1)

      // получаем индекс элемента, над которым держим карточку
      const dropIndex = board.items.indexOf(item)

      board.items.splice(dropIndex, 0, currentItem)
      
      setBoards(boards.map(currentIteratorBoard =>  {
         if(currentIteratorBoard.id === board.id){
            return board
         }
         if(currentIteratorBoard.id === currentBoard.id){
            return currentBoard
         }

         return currentIteratorBoard
      }))
   }


   const dropCardHandler = (e, board) => {
      board.items.push(currentItem)
      const currentIndex = currentBoard.items.indexOf(currentItem)

      currentBoard.items.splice(currentIndex, 1)

      setBoards(boards.map(currentIteratorBoard =>  {
         if(currentIteratorBoard.id === board.id){
            return board
         }
         if(currentIteratorBoard.id === currentBoard.id){
            return currentBoard
         }

         return currentIteratorBoard
      }))
   }

   return  (
      <>
         {boards.map(board => (
            <div 
               className={style.board}
               onDragOver={e => dragOverHandler(e)}
               onDrop={(e) => dropCardHandler(e, board)}
            >
               <div className={style.board__title}>
                  {board.title}
               </div>
               {board.items.map(item => (
                  <div  onDragStart={(e) => dragStartHandler(e, board, item)} onDragLeave={dragLeaveHandler} onDragEnd={dragEndHandler} onDragOver={dragOverHandler} onDrop={(e) => dropHandler(e, board, item)} draggable className={style.item}>
                     {item.title}
                  </div>
               ))}
            </div>
         ))}
         

      </>
     
   )
}



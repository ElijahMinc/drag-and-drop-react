import React, { useEffect, useState } from 'react'
import style from './Style.module.css'
export const EasyDragAndDrop = () => {
   const [show, setShow] = useState(false)
   const [cardList, setCardList] = useState([
      {
         id: 1,
         order:3,
         text: "Карточка 3"
      },
      {
         id: 2,
         order:1,
         text: "Карточка 1"
      },
      // {
      //    id: 3,
      //    order:2,
      //    text: "Карточка 2"
      // },
      // {
      //    id: 4,
      //    order:4,
      //    text: "Карточка 4"
      // },
   ])

   useEffect(() => {

      console.log('mount')
      return () => {
         console.log('unmount')
      }
   }, [])

   const  [currentCard, setCurrentCard] = useState(null)

   const dragStartHandler = (e, card) => {
      console.log('dragStartHandler',card)
      setCurrentCard(card)
   }

   const dragEndHandler = (e) => {
      // console.log('dragEndHandler',e)
      
   }

   const dragLeaveHandler = (e) => {
      // console.log('dragLeaveHandler',e)
      e.target.style.background = 'white'
      
   }

   const dragOverHandler = (e) => {
      e.preventDefault()
      // console.log('dragOverHandler',e)
      e.target.style.background = 'lightgray'


      
   }

   const dropHandler = (e, card) => {
      e.preventDefault()
      const updateList = cardList.map(c => {
         // если текущая карточка исходного массива
         // равняется карточке, на которую мы приземляемся
         // возвращаем 
         if(c.id === card.id){
            return {...c, order: currentCard.order}
         }

         if(c.id === currentCard.id){
            return {...c, order: card.order}

         }

         return c
      })
      console.log('updateList', updateList)
      setCardList(updateList)

      e.target.style.background = 'white'
      
   }

   const sortCards = (a ,b) => {
      if(a.order > b.order){
         return 1
      }else{
         return -1
      }
   }

console.log('cardList', cardList)
   return  cardList.sort(sortCards).map(card => (
            <div key={card.id} onDragStart={(e) => dragStartHandler(e, card)} onDragLeave={dragLeaveHandler} onDragEnd={dragEndHandler} onDragOver={dragOverHandler} onDrop={(e) => dropHandler(e, card)} draggable className={style.card}>
               {card.text}
            </div>
         ))
}



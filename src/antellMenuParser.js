// This file is partly based on
// https://github.com/cxcorp/antell-lunchmenu-flowdock/blob/master/src/lunch-menu-parser.js
//
// MIT License

// Copyright (c) 2017 Joona Heikkilä

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import moment from 'moment'

const weekdaysFinnish = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai']

const removeElements = (elms) => [...elms].forEach(el => el.remove())

function parseDaysMenuTable(table) {

  const createEmptyMenuItem = () => ({
    title: '',
    price: null,
    courses: [].slice()
  })
  const parsedMenu = [createEmptyMenuItem()]
  let currentMenuIndex = 0

  table.querySelectorAll('tr').forEach(element => {
    const text = element.firstElementChild.innerText
    const price = element.children[1].innerText
    if (text) {
      const isTitle = text.trim().slice(-1)[0] === ':'
      if (isTitle) {
        if (parsedMenu[currentMenuIndex].title) {
          // we just hit new section
          currentMenuIndex = ++currentMenuIndex
          parsedMenu.push(createEmptyMenuItem())
        }
        parsedMenu[currentMenuIndex].title = text.trim()
      } else {
        parsedMenu[currentMenuIndex].courses.push(text.trim())
      }
    }
    if (price) {
      parsedMenu[currentMenuIndex].price = price.trim()
    }
  })
  console.log(parsedMenu)
  return parsedMenu;
}

export function getTodaysMenu(html) {
  const parser = new DOMParser()
  const document = parser.parseFromString(html, "text/html")
  const [...contentBlocks] = document.querySelectorAll('#lunch-content-table .show')
  const dayBlocks = contentBlocks.filter(isBlockADaysMenu)

  // parse restaurant name
  const restaurantNameBlock = document.querySelector('.restaurant-name')
  const restaurantName = restaurantNameBlock.querySelector('b').innerText
  // parse restaurant url
  const restaurantUrl = restaurantNameBlock.getAttribute('data-restaurant-link')

  // select today's menu
  const todaysMenuBlock = dayBlocks[moment().isoWeekday() - 1]

  // remove unwanted contents
  const table = todaysMenuBlock.querySelector('table tbody')
  const weekdayNameRow = todaysMenuBlock.querySelectorAll('tr')[0]
  const uselessRow = todaysMenuBlock.querySelector('.line')
  table.removeChild(weekdayNameRow)
  table.removeChild(uselessRow)

  // remove elements used for spacing
  removeElements(table.getElementsByClassName('space'))
  removeElements(table.querySelectorAll('[width="10"]'))

  const parsedMenu = parseDaysMenuTable(table)

  return {
    restaurantName,
    restaurantUrl,
    parsedMenu,
    todaysMenuHtml: todaysMenuBlock.innerHTML, // can be used e.g. for debugging (or injected directly inside react element)
  }
}

const weekDaysMap/*: { [day: string]: true }*/ = weekdaysFinnish.reduce(
  (acc, day) => { acc[day] = true; return acc },
  {}
)

/** Returns whether a content block is a container for a day's lunch menu
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isBlockADaysMenu(element) {
  const firstRow = element.querySelector('tr')
  if (!firstRow) return false
  const tds = firstRow.getElementsByTagName('td')
  if (tds.length < 4) return false
  const weekday = tds[1].textContent.trim()
  return !!weekDaysMap[weekday]
}

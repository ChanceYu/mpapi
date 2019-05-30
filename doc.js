const path = require('path')
const fs = require('fs-extra')
const readline = require('linebyline')
const _ = require('underscore')
const moment = require('moment')

const TEMPLATE = path.join(__dirname, 'TEMPLATE.md')
const README = path.join(__dirname, 'README.md')

const NORMALAPI_FILE = path.join(__dirname, 'src/api/normalApi.js')
const POLYFILLS_FILE = path.join(__dirname, 'src/polyfills/index.js')

let NORMALAPI_DATA = []
let POLYFILLS_DATA = []

// normalApi.js 转换成数组数据
function handlerNormalApi(){
  let rl = readline(NORMALAPI_FILE, { retainBuffer: true })

  let ready = false

  return new Promise((resolve) => {
    rl.on('line', (data) => {
      let content = data.toString()
      
      if(/module\.exports/.test(content)){
        ready = true
      }
  
      if(ready){
        matchTitle(content, NORMALAPI_DATA)
  
        let last = NORMALAPI_DATA[NORMALAPI_DATA.length - 1]
  
        let matchApi = content.match(/'(\w+)',(\s+\/\/\s+([\w\s]+))?/)
        if(last && matchApi && matchApi[1]){
          let labels = []
  
          if(matchApi[3]){
            labels = matchApi[3].split(/\s/)
          }
          
          last.items.push({
            title: matchApi[1],
            labels: labels
          })
        }
      }
    });
  
    rl.on('end', resolve)
  })
}


// polyfills/index.js 转换成数组数据
function handlerPolyfills(){
  let rl = readline(POLYFILLS_FILE, { retainBuffer: true })

  let ready = false

  return new Promise((resolve) => {
    rl.on('line', (data) => {
      let content = data.toString()
      
      if(/module\.exports/.test(content)){
        ready = true
      }
  
      if(ready){
        matchTitle(content, POLYFILLS_DATA)
  
        let last = POLYFILLS_DATA[POLYFILLS_DATA.length - 1]
  
        let matchApi = content.match(/(\w+):/)
        if(last && matchApi && matchApi[1]){
          last.items.push({
            title: matchApi[1],
          })
        }
      }
    });
  
    rl.on('end', resolve)
  })
}

// 匹配一级标题
function matchTitle(content, obj){
  let matchs = content.match(/\/\/\s([\u4e00-\u9fa5]+.*)/)
  if(matchs && matchs[1]){
    obj.push({
      title: matchs[1],
      items: []
    })
  }
}

function writeMarkdown(){
  let tplContent = fs.readFileSync(TEMPLATE).toString()
  let compiled = _.template(tplContent);

  tplContent = compiled({
    updateDate: moment().format('YYYY-MM-DD'),
    normalApi: NORMALAPI_DATA,
    polyfills: POLYFILLS_DATA
  });

  fs.writeFileSync(README, tplContent, 'utf-8');
}

async function init(){
  await handlerNormalApi()
  await handlerPolyfills()
  
  writeMarkdown()
}

// 开始转换
init()
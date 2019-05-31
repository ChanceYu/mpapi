const path = require('path')
const fs = require('fs-extra')
const readline = require('linebyline')
const _ = require('underscore')
const moment = require('moment')

const TEMPLATE = path.join(__dirname, 'TEMPLATE.md')
const README = path.join(__dirname, 'README.md')

const NORMALAPI_FILE = path.join(__dirname, 'src/api/normalApi.js')
const INSTANCEAPI_FILE = path.join(__dirname, 'src/api/instanceApi.js')
const POLYFILLS_FILE = path.join(__dirname, 'src/polyfills/index.js')

let NORMALAPI_DATA = []
let INSTANCEAPI_DATA = []
let POLYFILLS_DATA = []

async function init(){
  await handlerNormalApi()
  await handlerInstanceApi()
  await handlerPolyfills()
  
  writeMarkdown()
}

// 开始任务
init()

// normalApi.js 转换成数组数据
function handlerNormalApi(){
  return handler(NORMALAPI_FILE, NORMALAPI_DATA, {
    hasItems: true
  })
}

// instanceApi.js 转换成数组数据
function handlerInstanceApi(){
  return handler(INSTANCEAPI_FILE, INSTANCEAPI_DATA, {
    hasItems: false
  })
}


// polyfills/index.js 转换成数组数据
function handlerPolyfills(){
  return handler(POLYFILLS_FILE, POLYFILLS_DATA, {
    hasItems: true,
    itemReg: /(\w+):/
  })
}

/**
 * 文件注释转数组数据
 * @param file 文件路径
 * @param arr 保存的数据
 * @param opts 配置参数
 * @param [opts.hasItems] 是否有子级
 * @param [opts.itemReg] 子级匹配的正则
 */
function handler(file, arr, opts){
  let rl = readline(file, { retainBuffer: true })

  let ready = false

  return new Promise((resolve) => {
    rl.on('line', (data) => {
      let content = data.toString()
      
      if(/module\.exports/.test(content)){
        ready = true
      }
  
      if(ready){
        // 匹配一级中文开头的标题
        let matchs = content.match(/\/\/\s([\u4e00-\u9fa5]+.*)/)
        if(matchs && matchs[1]){
          arr.push({
            title: matchs[1],
            items: []
          })
        }

        // 匹配 API 上的注释
        let item = null
        let matchApi = content.match(opts.itemReg || /'(\w+)',(\s+\/\/\s+([\w\s]+))?/)
        if(matchApi && matchApi[1]){
          let labels = []
  
          if(matchApi[3]){
            labels = matchApi[3].split(/\s/)
          }

          item = {
            title: matchApi[1],
            labels: labels
          }
        }
    
        if(item){
          if(opts.hasItems){
            let last = arr[arr.length - 1]
            last && last.items.push(item)
          }else{
            arr.push(item)
          }
        }
      }
    });
  
    rl.on('end', resolve)
  })
}

// 生成文档，TEMPLATE.md => README.md
function writeMarkdown(){
  let tplContent = fs.readFileSync(TEMPLATE).toString()
  let compiled = _.template(tplContent);

  tplContent = compiled({
    updateDate: moment().format('YYYY-MM-DD'),
    instanceApi: INSTANCEAPI_DATA,
    normalApi: NORMALAPI_DATA,
    polyfills: POLYFILLS_DATA
  });

  fs.writeFileSync(README, tplContent, 'utf-8');
}
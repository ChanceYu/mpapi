const path = require('path');
const fs = require('fs-extra');
const readline = require('linebyline');
const _ = require('underscore');

const APIS_FILE = path.join(__dirname, 'src/apis.js')
const POLYFILLS_FILE = path.join(__dirname, 'src/polyfills/index.js')
const TEMPLATE = path.join(__dirname, 'TEMPLATE.md')
const README = path.join(__dirname, 'README.md')

const regTitle = /\/\/\s([\u4e00-\u9fa5]+.*)/
let apis = []
let polyfills = []

function handlerApis(){
  let rl = readline(APIS_FILE, { retainBuffer: true })

  let ready = false

  rl.on('line', function (data, linecount){
    let content = data.toString()
    
    if(/module\.exports/.test(content)){
      ready = true
    }

    if(ready){
      let matchTitle = content.match(regTitle)
      if(matchTitle && matchTitle[1]){
        apis.push({
          title: matchTitle[1],
          items: []
        })
      }

      let last = apis[apis.length - 1]

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

  rl.on('end', function(){
    handlerPolyfills()
  })
}



function handlerPolyfills(){
  let rl = readline(POLYFILLS_FILE, { retainBuffer: true })

  let ready = false

  rl.on('line', function (data, linecount){
    let content = data.toString()
    
    if(/module\.exports/.test(content)){
      ready = true
    }

    if(ready){
      let matchTitle = content.match(regTitle)
      if(matchTitle && matchTitle[1]){
        polyfills.push({
          title: matchTitle[1],
          items: []
        })
      }

      let last = polyfills[polyfills.length - 1]

      let matchApi = content.match(/(\w+):/)
      if(last && matchApi && matchApi[1]){
        last.items.push({
          title: matchApi[1],
        })
      }
    }
  });

  rl.on('end', function(){
    writeMarkdown()
  })
}

function writeMarkdown(){
  let tplContent = fs.readFileSync(TEMPLATE).toString()
  let compiled = _.template(tplContent);

  tplContent = compiled({
    apis,
    polyfills
  });

  fs.writeFileSync(README, tplContent, 'utf-8');
}

handlerApis()
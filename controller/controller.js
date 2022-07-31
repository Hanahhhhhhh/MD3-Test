const fs = require('fs');
const controlModel = require("../model/controlModel.js");
const qs = require('qs');
const url = require('url');

class controller {
    constructor() {
        this.control = new controlModel();
        this.editButton = (obj) => {
            return `<button type="button" class "btn btn-primary " data-toggle = "modal" data-target="#exampleModal" data-whatever= "@mdo" onclick ='getEditButton(${obj})'>Edit</button>`;

        }

    }

    showPageList(req, res) {
        this.control.getCity().then((dataDB) => {
            fs.readFile('./views/index.html', 'utf-8',  (err,data) => {
                let html = '';
                dataDB.forEach((item, index) => {
                    html += '<tr>'
                    html += `<td>${index + 1}</td>`
                    html += `<td><a href ='/list/detail?id=${item.id}' style="color: blue">${item.name}</a></td>`
                    html += `<td>${item.country}</td>`
                    html += `<td><a href ='/list/delete?id=${item.id}' class="btn btn-danger">Delete</a>
                     ${this.editButton(JSON.stringify(item))}
                     </td>`
                    html += '</tr>'
                })
                data = data.replace('{list}', html);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            })
        })
    }

    deleteCity(id, req, res) {
        this.control.deleteCity(id).then(data => {
            res.writeHead(301, {
                Location: `http://localhost:8080/list`
            })
            res.end();
        })
    }

    showPageDetail(id, req, res) {
        this.control.getCityByID(id).then(dataDB => {
            fs.readFile('./views/detailCity.html', "utf-8", ((err, data) => {
                data = data.replace('{cities}', dataDB[0].name);
                data = data.replace('{nameCities}', dataDB[0].name);
                data = data.replace('{area}', dataDB[0].area);
                data = data.replace('{population}', dataDB[0].population);
                data = data.replace('{gdp}', dataDB[0].gdp);
                data = data.replace('{country}', dataDB[0].country);
                data = data.replace('{description}', dataDB[0].description);
                data = data.replace('<a href="">{delete}</a>', `<a href="/list/delete?id =$dataDB[0].id" class = 'btn btn-danger'>Delete</a>`);
                data = data.replace('<a href="">{edit}</a>', `${this.editButton(JSON.stringify(dataDB[0]))}`);
                res.writeHead(200, {'Content_Type': 'text/html'});
                res.write(data);
                res.end();
            }))
        })
    }

    addCity(req, res) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const city = qs.parse(data);
            this.control.addCites(city.addName, city.addCountry, city.addArea, city.addPopulation, city.addGDP, city.addDescription).then(data => {
                res.writeHead(301,
                    {Location: `http://localhost:8080/list`});
                res.end();
            }).catch(err => {
                fs.readFile( './views/add.html', 'utf-8', (err, data2)=>{
                    data2= data2.replace('<p style="color: pink; display : none"> Enter fail filed </p>,', '<p style="color: pink ; display: block">Enter the fail field</p>')
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data2);
                    res.end();
                })
            })
        })
    }

    showPageAdd(req, res) {
        fs.readFile('./views/add.html', 'utf-8',(err, data  )=> {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }

    editCity(req, res) {
        let data = '';
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            let a = qs.parse(data);
            this.control.editCities(a.id, a.editName, a.editArea, a.editPopulation, a.editGDP, a.editCountry, a.editDescription).then(data2 => {
                res.writeHead(301, {
                    Location: `http://localhost:8080/list`
                })
                res.end();
            })

        })


    }
}

module.exports = controller;



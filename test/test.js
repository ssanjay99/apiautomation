var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "https://flobizhiring-57e6.restdb.io";
var util = require("util");
var Mocha = require("mocha");
var report1 = require("mochawesome");
var result = "";
var putdata =
{
    title: makeid(10)
};
var postdata =
{
        description: "This is a new issue",
        fromemai: "knutmt@gmail.com",
        title: "New Issue"
};
var mocha = new Mocha({
    reporter: 'mochawesome'
  });



function makeid() {
    var length = 10;
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}




describe('Testing Get Request', function () {
    this.timeout(20000);

    it('returns all the records', function (done) {
        request.get({
            url: baseUrl + '/rest/issues',
            method: "GET",
            headers: {
                'Content-Type': 'application/xml',
                'x-apikey': '5da6fb5d3cbe87164d4bb35d'
            },
        },
            function (error, response, body) {
                if (error) {
                    console.log(error);
                }
                else {
                    try {
                        expect(response.statusCode).to.equal(200);
                        const bodyObj = JSON.parse(body);
                        console.log(bodyObj[0]);
                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                }
            });
    });

    it('returns the record using id', function (done) {
        request.get({
            url: baseUrl + '/rest/issues/588893fbf54b5f59000003ce',
            method: "GET",
            headers: {
                'Content-Type': 'application/xml',
                'x-apikey': '5da6fb5d3cbe87164d4bb35d'
            },
        },
            function (error, response, body) {
                if (error) {
                    console.log(error);
                }
                else {
                    try {
                        expect(response.statusCode).to.equal(200);
                        console.log(JSON.parse(body));
                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                }
            });
    });

    it('returns The records using Email', function (done) {
        request.get({
            url: baseUrl + '/rest/issues?fromemail=knutmt@gmail.com',
            method: "GET",
            headers: {
                'Content-Type': 'application/xml',
                'x-apikey': '5da6fb5d3cbe87164d4bb35d'
            },
        },
            function (error, response, body) {
                if (error) {
                    console.log(error);
                }
                else {
                    try {
                        expect(response.statusCode).to.equal(200);
                        console.log(JSON.parse(body));
                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                }
            });
    });
});

describe('Testing Put Request', function () {
    this.timeout(20000);
    it('returns luke', function (done) {
        request.put({
            url: 'https://flobizhiring-57e6.restdb.io/rest/issues/5888abddf54b5f5900000409',
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(putdata)),
                'x-apikey': '5da6fb5d3cbe87164d4bb35d'
            },
            json: putdata
        },
            function (error, response, body) {
                if (error) {
                    console.log(error);
                }
                else {
                    try {
                        expect(response.statusCode).to.equal(200);
                        expect(response.body.title).to.equal(result);
                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                }
            });
    });
});

describe('Testing POST Request', function () {
    this.timeout(20000);
    it('Creates New data entry', function (done) {
        request.post({
            url: baseUrl + '/rest/issues',
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(postdata)),
                'x-apikey': '5da6fb5d3cbe87164d4bb35d'
            },
            json: postdata
        },
            function (error, response, body) {
                if (error) {
                    console.log(error);
                    done();
                }
                else {
                    try {
                        expect(response.statusCode).to.equal(201);
                        console.log(response.body);
                        done();
                    }
                    catch (e) {
                        done(e);
                    }
                }
            });
    });
});
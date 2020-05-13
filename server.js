var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    typeMime = {
        '.html': 'text/html',
        '.htm': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
    }
http.createServer(function(req, res){
    var _url = url.parse(req.url),
        folename = _url.pathname.substring(1),
        extname,
        type,
        img;
    if(_url.pathname == "/") {
        filename = 'index.html';
    }
    extname = path.extname(filename);
    type = typeMime[path.extname(filename)];

    if((extname === '.png') || (extname === '.jpg')) {
        img = fs.readFileSync(filename);
        res.writeHead(200, {
            'Content-Type': type
        });
        res.write(img, 'hex');
        res.end();
    } else {
        fs.readFile(filename, 'utf-8', function(err, content) {
            if(err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain; charset=utf-8'
                });
                res.write(err.message);
                res.end('Error loading');
            } else {
                res.writeHead(200, {
                    'Content-Type': type
                });
                res.write(content);
                res.end();
            }
        })
    }
}).listen(8080);

console.log('Server running on port 8080...');
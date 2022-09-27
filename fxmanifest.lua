fx_version "cerulean"
game "gta5"

client_script 'dist/client.js'
server_scripts { 
    'dist/server.js',
    '@oxmysql/lib/MySQL.lua',
}

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/*.js',
}

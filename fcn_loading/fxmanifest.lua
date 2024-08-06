fx_version 'adamant'
game 'gta5'


files {
    -- Main
    'style.css',
	'fog.css',
	'snow.css',
	'images/*',

	'edit_this.html',

	"snowflakes.js",
	"app.js",
	"cursor.js",

	"cursor.png",
    
    -- Musiken
    --'music/music.ogg'
    'music/music.mp3'
}

loadscreen 'edit_this.html'

loadscreen_manual_shutdown "yes"

-- loadscreen_cursor 'yes'

client_script "client.lua"


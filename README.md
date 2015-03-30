# fs_curl_mongo
this is a nodeJs version of fs_curl, the purpose of this application is to load freeswitch configuration,directory and dialplan form mongodb

# Dependencies
* freeswitch 1.2
* mongodb 2.4.9
* nodejs v0.10.25

# Configuration
eanble mod_xml_curl(module.conf.xml)

edit xml_curl.conf.xml file 
```
<bindings>
    <binding name="configuration">
          <param name="gateway-url" value="http://localhost:3000/configuration" bindings="configuration"/>
    </binding>
    <binding name="directory">
          <param name="gateway-url" value="http://localhost:3000/directory" bindings="directory"/>
    </binding>
    <binding name="dialplan">
          <param name="gateway-url" value="http://localhost:3000/dialplan" bindings="dialplan"/>
    </binding>
 </bindings>
```

## initialisation ##
* run **grunt init** to load default config.
* login with user1@altercall.org/user1 and call 9664 you should listen to the default hold_music

## Modules ##

only few modules are implemented:
* mod_callcenter
* mod_cdr_mongodb
* mod_event_socket
* mod_post_load_modules
* mod_sofia
* mod_xml_cdr

### Add new module ###
1. add module to **post_load_modules** table(load_module= true,xml_curl_enabled=true )
2. add your config file under controller/configuration

## TODO ##

add more module(ivr,queues...)

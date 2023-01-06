$(function(){
    var app = new Vue({
        el: '#app',
        data: {
            combination: [
                {
                    visible: true,
                    services_name: 'mc',
                    container_name: '',
                    ports: [
                        {
                            one: 25565,
                            two: 25565
                        }
                    ],
                    environment: {
                        EULA: 'true',
                        SERVER_NAME: '',
                        VERSION: '',
                        TYPE: '',
                        FORGE_VERSION: '',
                        FABRIC_LAUNCHER_VERSION: '',
                        FABRIC_LOADER_VERSION: '',
                        ICON: '',
                        OVERRIDE_ICON: false,
                        ALLOW_FLIGHT: 'false',
                        ALLOW_NETHER: 'true',
                        BROADCAST_CONSOLE_TO_OPS: 'true',
                        BROADCAST_RCON_TO_OPS: 'true',
                        DIFFICULTY: 'easy',
                        ENABLE_COMMAND_BLOCK: 'true',
                        ENABLE_JMX: 'false',
                        ENABLE_QUERY: 'false',
                        ENABLE_RCON: 'false',
                        ENABLE_STATUS: 'true',
                        ENFORCE_WHITELIST: 'false',
                        ENTITY_BROADCAST_RANGE_PERCENTAGE: 100,
                        FORCE_GAMEMODE: 'false',
                        FUNCTION_PERMISSION_LEVEL: '2',
                        MODE: 'survival',
                        GENERATE_STRUCTURES: 'true',
                        GENERATOR_SETTINGS: '{}',
                        HARDCORE: 'false',
                        INITIAL_DISABLED_PACKS: '',
                        INITIAL_ENABLED_PACKS: 'vanilla',
                        LEVEL: 'world',
                        SEED: '',
                        LEVEL_TYPE: 'minecraft:normal',
                        MAX_BUILD_HEIGHT: 256,
                        MAX_PLAYERS: 20,
                        MAX_TICK_TIME: 60000,
                        MAX_WORLD_SIZE: 29999984,
                        MOTD: 'A Minecraft Server',
                        NETWORK_COMPRESSION_THRESHOLD: 256,
                        ONLINE_MODE: 'true',
                        OP_PERMISSION_LEVEL: 4,
                        PLAYER_IDLE_TIMEOUT: 0,
                        PREVENT_PROXY_CONNECTIONS: 'false',
                        PVP: 'true',
                        QUERY_PORT: 25565,
                        RCON_PASSWORD: '',
                        RCON_PORT: 25575,
                        SERVER_PORT: 25565,
                        SIMULATION_DISTANCE: 10,
                        SPAWN_ANIMALS: 'true',
                        SPAWN_MONSTERS: 'true',
                        SPAWN_NPCS: 'true',
                        SPAWN_PROTECTION: 16,
                        SYNC_CHUNK_WRITES: 'true',
                        USE_NATIVE_TRANSPORT: 'true',
                        VIEW_DISTANCE: 10,
                        ENABLE_WHITELIST: 'false',
                    },
                    volumes: []
                }
            ],
            yaml_code: '',
        },
        methods: {
            toggleServerContent(index){
                this.combination[index].visible = !this.combination[index].visible;
            },
            addServer(){
                this.combination.push({
                    visible: true,
                    services_name: 'mc',
                    container_name: '',
                    ports: [
                        {
                            one: 25565,
                            two: 25565
                        }
                    ],
                    environment: {
                        EULA: 'true',
                        SERVER_NAME: '',
                        VERSION: '',
                        TYPE: '',
                        FORGE_VERSION: '',
                        FABRIC_LAUNCHER_VERSION: '',
                        FABRIC_LOADER_VERSION: '',
                        ICON: '',
                        ALLOW_FLIGHT: 'false',
                        ALLOW_NETHER: 'true',
                        BROADCAST_CONSOLE_TO_OPS: 'true',
                        BROADCAST_RCON_TO_OPS: 'true',
                        DIFFICULTY: 'easy',
                        ENABLE_COMMAND_BLOCK: 'true',
                        ENABLE_JMX: 'false',
                        ENABLE_QUERY: 'false',
                        ENABLE_RCON: 'false',
                        ENABLE_STATUS: 'true',
                        ENFORCE_WHITELIST: 'false',
                        ENTITY_BROADCAST_RANGE_PERCENTAGE: 100,
                        FORCE_GAMEMODE: 'false',
                        FUNCTION_PERMISSION_LEVEL: '2',
                        MODE: 'survival',
                        GENERATE_STRUCTURES: 'true',
                        GENERATOR_SETTINGS: '{}',
                        HARDCORE: 'false',
                        INITIAL_DISABLED_PACKS: '',
                        INITIAL_ENABLED_PACKS: 'vanilla',
                        LEVEL: 'world',
                        SEED: '',
                        LEVEL_TYPE: 'minecraft:normal',
                        MAX_BUILD_HEIGHT: 256,
                        MAX_PLAYERS: 20,
                        MAX_TICK_TIME: 60000,
                        MAX_WORLD_SIZE: 29999984,
                        MOTD: 'A Minecraft Server',
                        NETWORK_COMPRESSION_THRESHOLD: 256,
                        ONLINE_MODE: 'true',
                        OP_PERMISSION_LEVEL: 4,
                        PLAYER_IDLE_TIMEOUT: 0,
                        PREVENT_PROXY_CONNECTIONS: 'false',
                        PVP: 'true',
                        QUERY_PORT: 25565,
                        RCON_PASSWORD: '',
                        RCON_PORT: 25575,
                        SERVER_PORT: 25565,
                        SIMULATION_DISTANCE: 10,
                        SPAWN_ANIMALS: 'true',
                        SPAWN_MONSTERS: 'true',
                        SPAWN_NPCS: 'true',
                        SPAWN_PROTECTION: 16,
                        SYNC_CHUNK_WRITES: 'true',
                        USE_NATIVE_TRANSPORT: 'true',
                        VIEW_DISTANCE: 10,
                        ENABLE_WHITELIST: 'false',
                    },
                    volumes: []
                })
            },
            reduceServer(index){
                if(this.combination.length > 1){
                    this.combination.splice(index, 1);
                }
            },
            addPorts(index){
                this.combination[index].ports.push({
                    one: '',
                    two: '',
                })
            },
            reducePorts(index, indexs){
                if(this.combination[index].ports.length > 1){
                    this.combination[index].ports.splice(indexs, 1);
                }
            },
            addDir(index){
                this.combination[index].volumes.push({
                    one: '',
                    two: '',
                })
            },
            reduceDir(index, indexs){
                if(this.combination[index].volumes.length > 0){
                    this.combination[index].volumes.splice(indexs, 1);
                }
            },
            generateYaml(){
                const this_ = this;
                $.ajax({
                    url: '/index/generate_yaml',
                    type: 'POST',
                    data: {
                        data: this.combination
                    },
                    success: function(res){
                        this_.yaml_code = res;
                    }
                })
            },
            downloadYaml(){

            }
        }
    })
})

const vertexShaderCode = `
            attribute vec4 a_position;
            uniform vec4 translation;
            uniform mat4 scaling;
            uniform mat4 rotation_matrix;

            void main(){
                gl_Position = rotation_matrix * scaling * a_position + translation;
            }
        `
const fragmentShaderCode = `
            precision mediump float;

            void main(){
                gl_FragColor = vec4(1.0, 0.0 , 0.0, 1.0);
            }
        `

let positions = []
let data_functions = [0,0,1,0]

function set_positions_variable(temp_positions){
    positions = temp_positions;
}

function set_data_functions_variable(temp_data_functions, num){
    data_functions[num]=temp_data_functions;
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success) {
        return shader
    }
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
}


function shaders() {
    const canvas = document.getElementById("mywebgl")
    const gl = canvas.getContext("webgl")

    if (gl == null) {
        alert("Algo malo paso")
        return
    }
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderCode)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode)

    const app = gl.createProgram()
    gl.attachShader(app, vertexShader)
    gl.attachShader(app, fragmentShader)
    gl.linkProgram(app)

    if (!gl.getProgramParameter(app, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(app))
        gl.deleteProgram(app)
        return
    }
    gl.useProgram(app)
    
    return [gl, app];
}

function pre_render(gl, app){

    render_functions(gl, app);
    render_dots(gl, app);

}

function render_functions(gl, app){

    Tx = data_functions[0];
    Ty = data_functions[1];

    transition_array = [Tx, Ty]

    scalate = data_functions[2];
    rotate = data_functions[3];


    scalate_function(gl, app, scalate);
    rotate_function(gl, app, rotate);
    translation_function(gl, app, transition_array);

}

function render_dots(gl, app){

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(app, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(
        positionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(
        gl.LINE_STRIP,
        0,
        Math.floor(positions.length / 2)
    );
}
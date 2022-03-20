function rotate_function(gl, app, rotate){

    var ANGLE = rotate;
    var radian = Math.PI * ANGLE / 180.0;
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);
    var rotationMatrix = new Float32Array([
      cosB, +sinB, 0, 0,
      -sinB, cosB, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);

    var u_rotation_matrix = gl.getUniformLocation(app, 'rotation_matrix');
    gl.uniformMatrix4fv(u_rotation_matrix, false, rotationMatrix);

}


function scalate_function(gl, app, scalate){

    var scalate_matrix = new Float32Array([
        scalate,   0.0,  0.0,  0.0,
        0.0,  scalate,   0.0,  0.0,
        0.0,  0.0,  1.0,   0.0,
        0.0,  0.0,  0.0,  1.0  
    ]);

    var u_scaling = gl.getUniformLocation(app, 'scaling');
    gl.uniformMatrix4fv(u_scaling, false, scalate_matrix);

}

function translation_function(gl, app, transition_array){
    Tx = transition_array[0];
    Ty = transition_array[1];
    Tz = 0;

    var translation = gl.getUniformLocation(app, 'translation');
    gl.uniform4f(translation, Tx, Ty, Tz, 0.0);
}
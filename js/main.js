function normalize_data(data, canvas) {

    waist = data[0] / (2 * canvas.width);
    chest = data[1] / (2 * canvas.width);
    _length = data[2] / (2 * canvas.height);
    shoulders = data[3] / (2 * canvas.width);

    return [waist, chest, _length, shoulders]
}

function normalize_point(point, canvas_source) {
    return point / (2 * canvas_source);
}


function calcultate_dots(data_shirt) {

    waist = data_shirt[0];
    chest = data_shirt[1];
    _length = data_shirt[2];
    shoulders = data_shirt[3];

    waist_middle_dot = [0, -0.25];
    waist_left_dot = [waist_middle_dot[0] - waist / 2, waist_middle_dot[1]];
    waist_right_dot = [waist_middle_dot[0] + waist / 2, waist_middle_dot[1]];

    chest_middle_dot = [waist_middle_dot[0], waist_middle_dot[1] + (_length * (2 / 3))];
    chest_left_dot = [chest_middle_dot[0] - chest / 2, chest_middle_dot[1]];
    chest_right_dot = [chest_middle_dot[0] + chest / 2, chest_middle_dot[1]];

    shoulders_middle_dot = [waist_middle_dot[0], waist_middle_dot[1] + (_length * (4.6 / 5))];
    shoulders_left_dot = [shoulders_middle_dot[0] - shoulders / 2, shoulders_middle_dot[1]];
    shoulders_right_dot = [shoulders_middle_dot[0] + shoulders / 2, shoulders_middle_dot[1]];

    left_sleve_upper_dot = [shoulders_left_dot[0] - (chest * (1 / 3)), shoulders_left_dot[1] - (chest * (1 / 3))]
    left_sleve_lower_dot = [shoulders_left_dot[0] - (chest * (1 / 6)), shoulders_left_dot[1] - (chest * (2 / 3))]

    right_sleve_upper_dot = [shoulders_right_dot[0] + (chest * (1 / 3)), shoulders_right_dot[1] - (chest * (1 / 3))]
    right_sleve_lower_dot = [shoulders_right_dot[0] + (chest * (1 / 6)), shoulders_right_dot[1] - (chest * (2 / 3))]

    height_middle_dot = [waist_middle_dot[0], waist_middle_dot[1] + _length];
    height_left_dot = [height_middle_dot[0] - waist / 4, height_middle_dot[1]];
    height_right_dot = [height_middle_dot[0] + waist / 4, height_middle_dot[1]];

    positions = [
        ...waist_left_dot,
        ...chest_left_dot,
        ...left_sleve_lower_dot,
        ...left_sleve_upper_dot,
        ...shoulders_left_dot,
        ...height_left_dot,
        ...height_right_dot,
        ...shoulders_right_dot,
        ...right_sleve_upper_dot,
        ...right_sleve_lower_dot,
        ...chest_right_dot,
        ...waist_right_dot,
        ...waist_left_dot,


    ];

    return positions


}

function additional_functions() {

    const canvas = document.getElementById("mywebgl");

    const input_rotate = document.getElementById("rotate");
    input_rotate.addEventListener("change", (event) => {
        rotate = input_rotate.value;
    });

    const input_scalate = document.getElementById("scalate");
    input_scalate.addEventListener("change", (event) => {
        scalate = input_scalate.value;
        console.log(scalate)
    });

    const input_translation_h = document.getElementById("translate_h");
    input_translation_h.addEventListener("change", (event) => {
        translate_h = input_translation_h.value;
        
    });

    const input_translation_v = document.getElementById("translate_v");
    input_translation_v.addEventListener("change", (event) => {
        translate_v = input_translation_v.value;
    });

    transalte_h_normalized = normalize_point(translate_h, canvas.width);
    transalte_v_normalized = normalize_point(translate_v, canvas.height);

    var data_functions = [transalte_h_normalized, transalte_v_normalized, scalate, rotate];

    set_data_functions_variable(data_functions);
    program()
}

function get_values_shirt() {

    const canvas = document.getElementById("mywebgl");

    var shirtForm = document.getElementById('shirt_form');

    shirtForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(shirtForm);


        var waist = formData.get("waist");
        var chest = formData.get("chest");
        var length = formData.get("length");
        var shoulders = formData.get("shoulders");

        var data = [waist, chest, length, shoulders];
        var data_normalized = normalize_data(data, canvas);



        var positions = calcultate_dots(data_normalized);

        set_positions_variable(positions);
        program();

    });

    const input_translation_h = document.getElementById("translate_h");
    input_translation_h.addEventListener("change", (event) => {
        translate_h = input_translation_h.value;
        transalte_h_normalized = normalize_point(translate_h, canvas.width);
        set_data_functions_variable(transalte_h_normalized, 0);
        program();
        
    });

    const input_translation_v = document.getElementById("translate_v");
    input_translation_v.addEventListener("change", (event) => {
        translate_v = input_translation_v.value;
        transalte_v_normalized = normalize_point(translate_v, canvas.height);
        set_data_functions_variable(transalte_v_normalized, 1);
        program();
    });

    const input_scalate = document.getElementById("scalate");
    input_scalate.addEventListener("change", (event) => {
        scalate = input_scalate.value;
        set_data_functions_variable(scalate, 2);
        program();

    });

    const input_rotate = document.getElementById("rotate");
    input_rotate.addEventListener("change", (event) => {
        rotate = input_rotate.value;
        set_data_functions_variable(rotate, 3);
        program();
    });

}


function program(){

    data_gl = shaders();
    gl = data_gl[0];
    app = data_gl[1];

    pre_render(gl,app);
}

window.onload = get_values_shirt;
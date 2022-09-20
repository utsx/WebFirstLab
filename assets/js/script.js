$(document).ready(function () {

    $("#check_form").on('submit', function (e) {
        e.preventDefault();
        if(!validationData($('input[name="R"]').val(), $('input[name="Y"]').val(), $('input[name="X"]:checked').val())) {
            alert("Validation failed");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/handler.php",
            data: {
                'R': $('input[name="R"]').val(),
                'Y': $('input[name="Y"]').val(),
                'X': $('input[name="X"]:checked').val()
            },
            success: createTableRow,
            dataType: "json"
        })
    });

    function validationData(r, y, x) {
        return isValidX(x) && isValidY(y) && isValidR(r);
    }



    function isValidX(x){
        if (x === null || x === "") {
            return false;
        }
        return true;
    }

    function isValidY(y){
        if (y === "") {
            return false;
        }
        if (y < -5 || y > 3) {
            return false;
        }
        return true;
    }

    function isValidR(r){
        if (r === "") {
            return false;
        }
        if (r < 1 || r > 4) {
            return false;
        }
        return true;
    }

    function createTableRow(json_object){
        document.querySelector(".history_table_body").innerHTML += `
			<tr>
				<td>${json_object.r}</td>
				<td>${json_object.x}</td>
				<td>${json_object.y}</td>
				<td>${json_object.result ? "Да" : "Нет"}</td>
	            <td>${json_object.date}</td>
	            <td>${(new Number(json_object.time * 1000)).toPrecision(3) + " ms"}</td>
			</tr>
			`;
    }
});





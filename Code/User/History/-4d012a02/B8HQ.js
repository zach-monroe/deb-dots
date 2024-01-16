$(document).ready(function(){
    var list = [],
    $ins = $('#fName, #lInitial'),
    counter = {
        fName: {},
        lInitial: {},
    };
    $('#submit').click(function(){
        event.preventDefault();
        var obj = {},
            valid = true;
        $ins.each(function(){
            var val = this.value.trim()
            if (val) {
                obj[this.id] = val;
            } else {
                var name = this.previousSibling.nodeValue.trim();
                alert(name.substring(0, name.length - 1) + ' cannot be blank');
                this.focus();
                valid = false;
                return false;
            }
        })
        if (valid){
            list.push(obj);
            $ins.val('');
    
            $.each(obj, function(key, value){
                var count = counter[key][value] || 0;
                counter[key][value] = count + 1;
            });
        }  
    });

    $('#print').click(function(){
        $('pre').text(JSON.stringify(list) + '\n\n');
        $('pre').append(document.createTextNode(JSON.stringify(counter))); 
        var data = JSON.stringify({
            list: list,
            counter: counter
        });
    
        var blob = new Blob([data], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
    
        var a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
    
        // Clean up
        setTimeout(function() {
            URL.revokeObjectURL(url);
        }, 0);
    });
});

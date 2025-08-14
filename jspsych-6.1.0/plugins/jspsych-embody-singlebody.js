jsPsych.plugins["embody-singlebody"] = (function(){
    var plugin = {};

    plugin.info = {
        name: "embody-singlebody",
        description: '',
        parameters: {
            stimulus: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'stimulus',
                default: undefined,
                description: 'The HTML string to be displayed'
            },
            preamble: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'stimulus',
                default: '',
                description: 'The HTML string to be displayed'
            },
            colour: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'colour',
                default: undefined,
                description: 'The colour for the body'
            },
            senstype: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'senstype',
                default: undefined,
                description: 'The text for the sensations corresponding to the body'
            },
            //spraycan: undefined, // the spraycan function, but as an input to make sure the plugin can access it
            margin_vertical: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Margin vertical',
                default: '0px',
                description: 'The vertical margin of the button.'
              },
              margin_horizontal: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Margin horizontal',
                default: '25px',
                description: 'The horizontal margin of the button.'
              },
        },
    }

    plugin.trial = function(display_element, trial){
        var task_html = '<div style="text-align:center;margin-top:10px;width:800px">'+
            '<div id = "preamble">'+
            trial.preamble + ' </div>'+
            '<div><p style="font-size:200%"><strong>'+
            trial.stimulus + '</strong></p></div></div>';

        //var task_html = '<div id="jspsych-html-button-response-stimulus">'+trial.stimulus+'</div>';

        var silimage = "'v1/images/dummyG_small.png'";

        var pbox_html = '<div class="jspsych-pbox" id="pbox" style="position:relative; touch-action:none; user-select:none;">'+
            //'<div id="pbox1" style="float:left;background-image:url('+silimage+');"></div>'+
            '<div id="pbox1" style="float:left"><img src="'+repo_site+'v1/images/dummyG_small.png"></img></div>'+
            '</div><div id="pboxpaint"></div>';

        var i = 0; // just so I don't have to recode stuff

        var spacer_html = '<div id="spacer"><img src="'+repo_site+'v1/images/dummyG_small_spacer.png"></img></div>';
        var label_html = '<div id="labels"><p style ="float:left;width:175px"><strong>'+trial.senstype+'</strong></p>';
         var btn_html = '<div id="jspsych-html-button-response-btngroup"><div class="jspsych-btn" style="display: inline-block; margin:'+trial.margin_vertical+' '+trial.margin_horizontal+'" id="jspsych-html-button-response-button-' + i +'" data-choice="'+i+'">Continue</div></div>';
        
        display_element.innerHTML = task_html+pbox_html+spacer_html+label_html+btn_html;

        // make a nice border
        jQuery('#jspsych-content').css('border-style','solid');
        jQuery('#jspsych-content').css('border-width','10px');
        jQuery('#jspsych-content').css('border-color','#888');
        jQuery('#jspsych-content').css('padding','20px');


        var start_time = performance.now();

        var clickfcn = function(e){
            var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
            //if(arrXD.length==0){
            //    window.confirm("You haven't colored anything in - are you sure you want to continue?")
            //}
            after_response(choice);
        };

        display_element.querySelector('#jspsych-html-button-response-button-' + i).addEventListener('click', clickfcn);


        var temp=document.getElementById("pbox");
        temp.onselectstart = function() { this.style.cursor='crosshair'; return false; }

        //xp=jQuery("#pbox").offset().left;
        //yp=jQuery("#pbox").offset().top;
        xp = 0;
        yp = 0;
        arrX = new Array(0);
        arrY = new Array(0);
        arrTime = new Array(0);

        arrXD = new Array(0);
        arrYD = new Array(0);
        arrTimeD = new Array(0);

        arrMD = new Array(0);
        arrMU = new Array(0);

        spraycan(display_element);

        jQuery(window).resize(function(){
            //setTimeout(function(){
            //if((window.outerWidth!=screen.width || window.outerHeight!=screen.height) && (window.innerWidth!=screen.width || window.innerHeight!=screen.height)){
                //console.log([window.innerWidth,window.innerHeight, window.outerWidth,window.outerHeight])
                //alert('It looks like you may have exited full-screen mode or resized your browser. Please return to full-screen mode before continuing the experiment. If you exited while coloring the bodies, your coloring has been reset.')
                jQuery('#spraycanBut').click();
            //}
            //},500);
            //window.resizeTo(scrsize[0],scrsize[1]);
        });

        jQuery("#pbox1").mousemove(function(e){
            var x= e.pageX - xp;
            var y = e.pageY - yp;
            var colid=Math.floor((x/10)%10);
            //if(x<450){
                spraycan.currColour = trial.colour;
            //}else{
                //spraycan.currColour = '0000ff';
            //}           
            arrX.push(x);
            arrY.push(y);
            arrTime.push(e.timeStamp);
                            
                            // debug stuff
                            /*
                            var pageCoords = "( " + arrXD[arrXD.length-1] + ", " + x + " )";
                            jQuery("span:first").text("( xD, x ) - " + pageCoords);
                            jQuery("span:last").text("( e.timeStamp ) - " + e.timeStamp);
                            */
                            //}).mousedown(function(e){
                            //  arrMD.push(e.timeStamp);
                            //
                            //}).mouseup(function(e){
                            //  arrMU.push(e.timeStamp);
                            
        });
/*
        jQuery("#pbox2").mousemove(function(e){
            var x= e.pageX - xp;
            var y = e.pageY - yp;
            var colid=Math.floor((x/10)%10);
            //if(x<450){
            //    spraycan.currColour = 'ff0000';
            //}else{
                spraycan.currColour = '00ff00';
            //}           
            arrX.push(x);
            arrY.push(y);
            arrTime.push(e.timeStamp);
                            
                            // debug stuff
                            
                            //var pageCoords = "( " + arrXD[arrXD.length-1] + ", " + x + " )";
                            //jQuery("span:first").text("( xD, x ) - " + pageCoords);
                            //jQuery("span:last").text("( e.timeStamp ) - " + e.timeStamp);
                            
                            //}).mousedown(function(e){
                            //  arrMD.push(e.timeStamp);
                            //
                            //}).mouseup(function(e){
                            //  arrMU.push(e.timeStamp);
                            
        });*/

        function after_response(choice) {

            // measure rt
            var end_time = performance.now();
            var rt = end_time - start_time;

            off1 = jQuery('#pbox1').offset();
            //off2 = jQuery('#pbox2').offset();



            trldata = {'arrXD': arrXD.map(num => Math.round(num)), 'arrYD': arrYD.map(num => Math.round(num)), 'arrMU': arrMU, 'arrMD': arrMD, 'rt': rt, stimulus: trial.stimulus,
                'pbox1l':off1.left,'pbox1t':off2.top};
      
            // after a valid response, the stimulus will have the CSS class 'responded'
            // which can be used to provide visual feedback that a response was recorded
            //display_element.querySelector('#jaspsych-html-button-response-stimulus').className += ' responded';
      
            // disable all the buttons after a response
            var btn = document.getElementById('jspsych-html-button-response-button-0');
            //for(var i=0; i<btns.length; i++){
              btn.removeEventListener('click',clickfcn);
              btn.disabled = 'disabled';
            //}
      
            end_trial();
            
          };

        function end_trial() {

            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // get rid of the border
            jQuery('#jspsych-content').css('border-style','none')
      
            // clear the display
            display_element.innerHTML = '';
      
            // move on to the next trial
            jsPsych.finishTrial(trldata);
        };

    }

    return plugin
})();
var winsize;
  
var xp; var yp;
var arrX = new Array(0);
var arrY = new Array(0);
var arrTime = new Array(0);

var arrXD = new Array(0);
var arrYD = new Array(0);
var arrTimeD = new Array(0);

var arrMD = new Array(0);
var arrMU = new Array(0);

var repo_site = "https://sorenwt.github.io/embody-qualtrics/";

//emos = ['HAPPINESS','SADNESS','ANGER','FEAR','DISGUST','SURPRISE'];
emos = ['','','','','',''];

count = 0; 

var seq = [1,2,3,4,5,6]; // replace this later depending on how/if we want to do balancing, shuffling
seq = jsPsych.randomization.repeat(seq,1);

var embodytrl = {
    type:'embody',
    preamble:'<div style="width:500px;margin:0 auto"><p style="font-size:120%;font-weight:bold">Using the pictures below, indicate what you felt in your body during the previous week.</p></div>',
    stimulus:function(){
        count +=1;
        return emos[seq[count-1]-1]
    },
    on_finish: function(data){
        data.test_part = 'embody_main';
        return data
    }
}

var surveytrl = {
    type:'survey-likert',
    preamble:function(){
        return '<p style="font-size:150%"> Please answer a few questions about how you experience the previous emotion (' +emos[seq[count-1]-1] +')'; 
    },
    questions: function(){
        return [
            {prompt:'How much do you feel '+emos[seq[count-1]-1] +' in your body?',name:'body_salience',labels:['Not at all','A little','Somewhat','Quite a bit','Very much'],required:true},
            {prompt:'How much do you feel '+emos[seq[count-1]-1] +' in your mind?',name:'mental_salience',labels:['Not at all','A little','Somewhat','Quite a bit','Very much'],required:true},
            {prompt:'How pleasant or unpleasant does '+emos[seq[count-1]-1] +' feel to you?',name:'valence',labels:['Very unpleasant','Somewhat unpleasant','Neither pleasant nor unpleasant','Somewhat pleasant','Very pleasant'],required:true},
            {prompt:'How much do you feel that you can control your experience of '+emos[seq[count-1]-1] +'?',name:'controllability',labels:['Not at all','A little','Somewhat','Quite a bit','Completely'],required:true},
            {prompt:'When was the last time you felt ' +emos[seq[count-1]-1] +'?',name:'lapse',labels:['Less than an hour ago','A few days ago','A few weeks ago','A few months ago','Over a year ago or never'],required:true},
        ]
    }
}

main_proc = {
    timeline:[embodytrl,surveytrl],
    repetitions:6,
};

/*
function getPos(el) {
    // yay readability
    for (var lx=0, ly=0;
        el != null;
        lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}*/


var welcome_fullscreen = {
    //type: "html-button-response",
    type:'fullscreen',
    fullscreen_mode: true,
    message: '<div style = "width:800px"><p style = "font-size:150%">Welcome to our experiment on emotion and bodily sensations.</p><br>'+
    //'<p style = "font-size:133%">Before you begin, please take a minute to minimize the notifications or interruptions you might be exposed to during the experiment. This can include muting your speakers or headphones, or setting your phone or computer to "do not disturb" mode.</p><br>' +
    //'You will need these in the experiment.</p>'+
    '<p style = "font-size:133%"> Please press the button below to enter full-screen mode and continue to the experiment. <strong>Please do not exit full-screen mode during the experiment.</strong></p>'+
    //'<br>'+
    '<p style = "font-size:133%"> Note that if you are using Safari, you might not enter full-screen mode. If this is the case, you should enter full-screen mode manually at this time.</p></div>'+
    //'<p style = "font-size:150%"> When you press the button below, your window will be resized to fill your screen. You will not be able to change the window width for the duration of the experiment, though you can drag it around or click out of it if you need to.</p><br><br>'+
    '<br><p style = "font-size:150%"> Please press the button below to continue to the experiment. </p>',
    //choices:['Continue'],
    data:function(){
        var dat = {test_part:'welcome_resize',sequence:seq};
        return dat
    },
    on_finish: function(){
        //winsize = [window.width,window.height];
        //window.resizeTo(scrsize[0],scrsize[1])
        window.onresize = function(){
            setTimeout(function(){
            if((window.outerWidth!=screen.width || window.outerHeight!=screen.height) && (window.innerWidth!=screen.width || window.innerHeight!=screen.height)){
                //console.log([window.innerWidth,window.innerHeight, window.outerWidth,window.outerHeight])
                alert('It looks like you may have exited full-screen mode or resized your browser. Please return to full-screen mode before continuing the experiment. If you exited while coloring the bodies, your coloring has been reset.')
            }
            },500);
            //window.resizeTo(scrsize[0],scrsize[1]);
        };
    },
}

/*var get_id = {
    type:'survey-text',
    preamble:'<p style="font-size:133%"> Please enter your email or Prolific ID'

}*/

var instructions = {
    type:'html-button-response',
    choices:['Click here to begin'],
    stimulus:'<div style = "width:1100px"><p style="font-size:133%"> In this experiment we study whereabouts in their bodies people feel different emotions.</p>'+
    '<p style="font-size:133%"> You will be presented with the name of one emotion (such as happiness), and pictures of two blank human bodies. Think carefully what you feel in your body when you feel the corresponding emotion.</p>'+
    '<p style="font-size:133%">Your task is to use your mouse to color the bodily regions whose activity you feel changing during the emotion. For the left body, color the regions whose activity you feel <span style="color:red;font-weight:bold">increasing or getting stronger</span> when you feel this emotion.'+
    ' For the right body, color the regions whose activity you feel <span style="color:blue;font-weight:bold">decreasing or getting weaker</span> when feeling that emotion. You can color any region of the bodies you feel appropriate, from the head to the toes. </p>'+
    '<p style="font-size:133%"> If you make a mistake, you can click the "clear" button at the bottom of the screen to clear your coloring. When you have finished coloring the bodies, click the "continue" button at the bottom of the screen to proceed to next emotion.</p></div>',
}

var proc_intro = {
    timeline:[instructions],
}

var endscreen_feedback = {
    type:'survey-text',
    preamble:'<div style="width:1000px"> <p style="font-size:133%">You have now completed the experiment. We thank you for your time and attention. '+
    'If you have any feedback about the experiment (strange things you noticed, things not loading or not working, etc.), please enter it in the box below. '+
    'Otherwise, you may click the "Finish study" button to end the experiment.</p></div>',
    questions:[
        {prompt:'Please enter any feedback you have about the experiment',name:'feedback',lines:2}
    ],
    button_label:'Finish study',
    data: function(){
        var dat = {test_part:'endscreen_feedback'};
        var resJson = jsPsych.data.get().json();
        jatos.submitResultData(resJson);
        return dat
    }
}

var endscreen_real = {
    type:'html-keyboard-response',
    choices: jsPsych.NO_KEYS,
    stimulus:'<div style="width:1000px"> <p style="font-size:150%"> Thank you. You will be redirected to Prolific in a few seconds to claim your reward.</p></div>',
    trial_duration:3000,
}

timeline = [];
timeline.push(proc_intro);
timeline.push(main_proc);

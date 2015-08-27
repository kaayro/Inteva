var iface = {
    pLogin: document.getElementById('login'),
    pActivity: document.getElementById('activity'),
    pPhoto: document.getElementById('photo'),
    enterBtn: document.getElementById('enter'),
    doneBtn: document.getElementById('done'),
    verifyBtn: document.getElementById('verify'),
    cancelBtn: document.getElementById('cancel'),
    ready: function(){
        document.addEventListener("deviceready", iface.init, false);
    },
    init: function(){
        iface.enterBtn.addEventListener('click', iface.getLogin, false);
        iface.doneBtn.addEventListener('click', activity.takeProve, false);
        iface.verifyBtn.addEventListener('click', photo.upload, false);
        iface.cancelBtn.addEventListener('click', photo.cancel, false);
    },
    getLogin: function(){
        var pass = document.getElementById('pass').value;
        login.get(pass);
    }
};

var login = {
    get: function(password){
        //Proceso ajax
        if(password == 'demo'){
            login.getResponse(data);
        }else{
            var alertDanger = document.querySelector('#login .alert');
            alertDanger.style.display = "block";
        }
    },
    getResponse: function(m){
        if(m != 0){
            activity.step = 0;
            activity.activities = m;
            activity.bindActivity();
            var alertDanger = document.querySelector('#login .alert');
            alertDanger.style.display = "none";
            //Cambiar pagina de login a inactive
            iface.pLogin.classList.remove('active');
            iface.pLogin.classList.add('inactive');
            iface.pActivity.classList.remove('inactive');
            iface.pActivity.classList.add('active');
        }
    }
};

var activity = {
    activities: null,
    step: 0,
    bindActivity: function(){
        iface.pActivity.querySelector('.page-header h2 small').innerHTML = activity.activities[activity.step].numero;
        iface.pActivity.querySelector('.page-content p').innerHTML = activity.activities[activity.step].descripcion;
    },
    takeProve: function(){
        //Tomar foto
        navigator.device.capture.captureImage(activity.getProve, activity.captureError, {limit:1});
        //activity.getProve([{path: "img/inteva3.png"}]);
    },
    captureError: function(err){
        navigator.notification.alert('Código del error: ' + err.code, null, 'Error al tomar la fotografía');
    },
    getProve: function(p){
        var prove = document.getElementById("prove");
        for(i = 0; i < p.length; i++){
            prove.attributes.item(0).value = p[i].path;
        }
        iface.pActivity.classList.remove('active');
        iface.pActivity.classList.add('inactive');
        iface.pPhoto.classList.remove('inactive');
        iface.pPhoto.classList.add('active');
    },
    nextStep: function(){
        document.getElementById('waitPage').style.visibility = 'hidden';
        activity.step++;
        if(activity.step < activity.activities.length){
            activity.bindActivity();
            iface.pPhoto.classList.remove('active');
            iface.pPhoto.classList.add('inactive');
            iface.pActivity.classList.add('active');
            iface.pActivity.classList.remove('inactive');
        }else{
            alert("El proceso terminó satisfactoriamente");
            iface.pPhoto.classList.remove('active');
            iface.pPhoto.classList.add('inactive');
            iface.pLogin.classList.add('active');
            iface.pLogin.classList.remove('inactive');
        }
    }
};

var photo = {
    upload: function(){
        //Subir fotos
        document.getElementById('waitPage').style.visibility = 'visible';
        setTimeout(activity.nextStep,2000);
    },
    cancel: function(){
        iface.pPhoto.classList.remove('active');
        iface.pPhoto.classList.add('inactive');
        iface.pActivity.classList.add('active');
        iface.pActivity.classList.remove('inactive');
    }
};

window.addEventListener("load", iface.ready, false);
var a=angular.module("log",[]);

a.controller("lctrl",function($scope,$http){
    $scope.un="";
    $scope.up="";

    $scope.cl=function(){
        var f=$http.get("index.jspx?un="+$scope.un+"&up="+$scope.up);
        f.success(function(data){
            if(data.msg=="error"){
                alert("登录失败，请检查您的账号密码");
            }else if(data.msg=="input"){
                alert("该账号已经登录");
            }else{z
                window.localStorage.setItem("uid",data.id);
                window.localStorage.setItem("realname",data.realname);

                alert("登录成功，正在跳转……");
                window.location.href="main.html";
            }
        });


    };

});

a.controller("actrl",function($scope,$http){
    $scope.aaaa="";

});
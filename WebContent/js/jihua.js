var a=angular.module("jihua",[]);

a.controller("jctrl",function($scope,$http){

    $scope.d1="";
    $scope.title1="";
    $scope.realname="";
    $scope.uid=0;
    $scope.jid=0;
    $scope.ss1=true;
    $scope.ss2=false;
    $scope.ss3=false;
    $scope.ss4=true;
    $scope.saveshow=true;
    $scope.updateshow=false;
    $scope.mingxis=[];
    $scope.t1={
        jid:0,
        jname:"",
        jtesk:"",
        jresult:""
    };


    $scope.init34=function(){
        $scope.realname=window.localStorage.getItem("realname");
        $scope.uid=window.localStorage.getItem("uid");
    };

    $scope.init34();

    $scope.xiugaicl=function(ind){
        $scope.t1=$scope.mingxis[ind];
        $scope.saveshow=false;
        $scope.updateshow=true;
    };

    $scope.getallmingxi=function(){
        var f=$http.get("getbyjid.jspx?jid="+$scope.t1.jid);
        f.success(function(data){
            $scope.mingxis=data;
        });
    };

    $scope.mingxisave=function(){
        var f=$http({
            method:"post",
            url:"savemingxi.jspx",
            params:$scope.t1
        });
        f.success(function(data){
            if(data.msg=="success"){
                $scope.t1.jname="";
                $scope.t1.jtesk="";
                $scope.t1.jresult="";
                $scope.getallmingxi();
            }
        });
    };

    $scope.mingxiupdate=function(){
        var f=$http({
            method:"post",
            url:"updatemingxi.jspx",
            params:$scope.t1
        });
        f.success(function(data){
            if(data.msg=="success"){
                $scope.t1.jname="";
                $scope.t1.jtesk="";
                $scope.t1.jresult="";
                $scope.saveshow=true;
                $scope.updateshow=false;
                $scope.getallmingxi();
            }
        });
    };
    $scope.mingxidel1=function(ind){
        if(confirm("确定删除？")){
            var d=$scope.mingxis[ind];
            var f=$http.get("delmingxi.jspx?id="+d.id);
            f.success(function(data){
                if(data.msg=="success"){

                    $scope.getallmingxi();
                }
            });
        }

    };

    $scope.ss4cl=function(){
        $scope.ss3=true;
        $scope.ss4=false;
    };
    $scope.ssacl=function(){
        $scope.ss3=false;
        $scope.ss4=true;
    };

    $scope.ss1cl=function(){

        var f=$http.get("addjihua.jspx?cdate="+$scope.d1+"&ctitle="+$scope.title1+"&uid="+$scope.uid);
        f.success(function(data){
            if(data.msg=="success"){
                var f1=$http.get("getonejihua.jspx?uid="+$scope.uid);
                f1.success(function(data1){
                    //$scope.jid=data1.id;
                    $scope.t1.jid=data1.id;
                    $scope.ss2=true;
                });
            }else{
                alert("添加失败");
            }
        });


    };

    $scope.$watch("d1",function(newvalue,oldvalue,scope){
        var d1= new Date(newvalue).getTime();
        var d2=new Date().getTime();
        if(d1>d2){
            $scope.title1=$scope.realname+newvalue+"出差计划表";
            $scope.ss1=true;
        }else{
            $scope.title1="请选择今天之后的日期";
            $scope.ss1=false;
        }

    });
});
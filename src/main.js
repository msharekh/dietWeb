var app = angular.module("myDietList", []);

app.controller("myCtrl", function ($scope) {
 


  fillPlans();
  $scope.plans = Plans;


  
  fillWeeks();
  $scope.weeks = Weeks;

  fillDays();
  $scope.days = Days;


  
  fillMeals();
  $scope.meals = Meals;


  fillFoods();
  $scope.foods = Foods;

  fillAmounts();
  $scope.amounts = Amounts;
  
  fillPlanFoods();
  $scope.planFoods = PlanFoods;


  //$scope.editMode= false;

  $scope.getCalorieTotal  = function()
  {
    var CalorieTotal = 0;
    for(var i = 0; i < ChosenPlanFoods.length; i++){
      var CalorieValue = ChosenPlanFoods[i].pf.f.fCalorie;
      var GramValue = ChosenPlanFoods[i].pf.a.aGram;
      var QtyValue = ChosenPlanFoods[i].pf.qty;
      CalorieTotal += CalorieValue*GramValue*QtyValue;
    }
    return CalorieTotal;      
  };

  // $scope.getFoodName = function (f) {
  //     return Foods[f.fId].fName;
  // };
  // $scope.getCalorie = function (f) {
  //     return Foods[f.fId].fCalorie;
  // };
  // $scope.getAmountName = function (a) {
  //     return Amounts[a.aId].aName;
  // };

  $scope.showMe = false;
  $scope.myFunc = function() {
    $scope.showMe = !$scope.showMe;
  };

  //var chosenPlanFood = [];

  //Add ChosenPlanFoods
  var ChosenPlanFoods = [];
  $scope.chosenPlanFoods=ChosenPlanFoods;
  $scope.addChosenPlanFoods=function (pf) { 
    //c(pf);
    c(ChosenPlanFoods.length);
    var ChosenPlanFoodsObj = { 
      cpfId: ChosenPlanFoods.length,  
      pf: pf 
    };

    ChosenPlanFoods.push(ChosenPlanFoodsObj);  
  };

  //Delete ChosenPlanFoods 
  $scope.deleteChosenPlanFoods=function (cpf) { 
    //c(cpf);
    c(ChosenPlanFoods.length);
    //delete ChosenPlanFoods[ pf.pfId ]; 
    for(var i=0 ; i<ChosenPlanFoods.length;i++){
      if(ChosenPlanFoods[i].pfId== cpf.pfId){
        ChosenPlanFoods.splice(i,1);
        c(cpf);
        console.clear();
        break;
      }
    }
    c(ChosenPlanFoods.length);
  };


  //change Qty
  $scope.changeQty = function (pf,n) {
    for(var i=0 ; i<PlanFoods.length;i++){
      if(PlanFoods[i].pfId== pf.pfId){
        c(PlanFoods[i].qty);
        //        //plus

        if(n==1)
        {
          c('plus');
          if(PlanFoods[i].qty<10){
            PlanFoods[i].qty+=n;
          }
        }

        //minus
        else if(n==-1)
        {
          c('minus');
          if(PlanFoods[i].qty>1 ){
            PlanFoods[i].qty+=n;
          }


        }
        c(PlanFoods[i].qty);
        break;
      }
    }

  };
  
  $scope.updatePlanFoods=function(){
    c(planFoods);
  };

  c(Days);
  c(Weeks);
  // $scope.searchPlans=function ()

});

app.filter('searchPlans',function(){

  return function(planfoods,selectedPlanId,selectedWeekId,selectedDayId,selectedMealId){
    var filtered=[];
    if (!selectedPlanId) { return planfoods;}
    angular.forEach(planfoods,function(pf){
      if (pf.p.pId==selectedPlanId 
          ||
          pf.w.wId == selectedWeekId
          || 
          pf.d.dId == selectedDayId
          || 
          pf.m.mId == selectedMealId) {
        filtered.push(pf);
      }
    });
    return filtered;

  };
});






//fill Plans
var Plans = [];
function fillPlans() {
  var PlanArr = ['اتكنز', 'نتريشن', 'دشتي', 'كيميائي'];
  
  for (var i = 0; i < PlanArr.length; i++) {
    // var PlanObj = { pId: i + 1, pName: PlanArr[i] };
    var planObj = new Plan();
    planObj.pId= i + 1;
    planObj.pName=PlanArr[i];

    Plans.push(planObj);
  }
}

//fill Weeks
var Weeks = [];
function fillWeeks() {
  var wArr = ['الاول', 'الثاني', 'الثالث', 'الرابع'];
  
  for (var i = 0; i < wArr.length; i++) {
    // var WeekObj = { wId: i + 1, wName: wArr[i] };
    var weekObj=new Week();
    weekObj.wId= i + 1;
    weekObj.wName= wArr[i];
    //c(dayobj);      
    Weeks.push(weekObj);
  }
}

//fill Days
var Days = [];
function fillDays() {
  var dArr = ['السبت', 'الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة'];
  
  for (var i = 0; i < dArr.length; i++) {
    // var DayObj = { dId: i + 1, dName: dArr[i] };
    var dayObj = new Day();

    dayObj.dId= i + 1;
    dayObj.dName= dArr[i];
    //c(dayobj);      
    Days.push(dayObj);
  }
}

//fill Meals
var Meals = [];
function fillMeals() {
  var MealArr = ['فطور', 'بعد الفطور', 'غداء', 'بعد الغداء', 'العشاء', 'بعد العشاء'];
  
  for (var i = 0; i < MealArr.length; i++) {
    // var MealObj = { mId: i + 1, mName: MealArr[i] };
    var mealObj = new Meal();

    mealObj.mId=i+1;
    mealObj.mName=MealArr[i];

    Meals.push(mealObj);
  }

  //c(Meals);
}

//fill Amounts
var Amounts = [];
function fillAmounts() {
  var AmountArr = 
      [
        [
          'كوب'
          ,
          30
        ]
        ,
        [
          'ملعقة'
          ,
          10
        ]
        ,
        [
          'صحن'
          ,
          100
        ]
        ,
        ['جرام'
         ,
         1
        ]
        ,
        [
          'حبة'
          ,
          5
        ]
        ,
        [
          'شريحة'
          ,
          200
        ]
      ];
  
  for (var i = 0; i < AmountArr.length; i++) {
    // var AmountObj = { aId: i + 1
    //                  , aName: AmountArr[i][0]
    //                  ,aGram:AmountArr[i][1] 
    //                 };
    var amountObj=new Amount();

    amountObj.aId= i + 1;
    amountObj.aName= AmountArr[i][0];
    amountObj.aGram=AmountArr[i][1]; 

    Amounts.push(amountObj);
  }
}

//fill Foods
var Foods = [];
function fillFoods() {
  var FoodArr = [['بيض',120], ['مارتديلا',540], ['جبن',50], ['شاي',20], ['قهوة',25], ['لحم',250], ['سلطة',50], ['حليب',70], ['تونة',80]];
  
  for (var i = 0; i < FoodArr.length; i++) {
    // var FoodObj = { fId: i + 1, fName: FoodArr[i][0],fCalorie:FoodArr[i][1] };
    var foodObj = new Food();
    foodObj.fid=i+1;
    foodObj.fName=FoodArr[i][0];
    foodObj.fCalorie=FoodArr[i][1];
    
    Foods.push(foodObj);
  }
}








//fill Coocks
// var Coocks = [];
// function fillCoocks() {
//   var CoockArr = ['مسلوق', 'مشوي'];
//   for (var i = 0; i < CoockArr.length; i++) {
//     var CoockObj = { cId: i + 1, cName: CoockArr[i] };
//     Coocks.push(CoockObj);
//   }
// }

//fill PlanFoods
var PlanFoods = [];
function fillPlanFoods() {

  PlanFoods.push(
   
     { pfId: 1, p: Plans[1],w:Weeks[1],d:Days[1], m: Meals[1], qty: 1, a: Amounts[1], f: Foods[1] },
    { pfId: 2, p: Plans[2],w:Weeks[2],d:Days[2], m: Meals[2], qty: 4, a: Amounts[3], f: Foods[2] },
    { pfId: 3, p: Plans[0],w:Weeks[1],d:Days[1], m: Meals[3], qty: 6, a: Amounts[4], f: Foods[3] },
    { pfId: 4, p: Plans[2],w:Weeks[2],d:Days[2], m: Meals[4], qty: 8, a: Amounts[1], f: Foods[4] },
    { pfId: 5, p: Plans[1],w:Weeks[1],d:Days[1], m: Meals[0], qty: 10, a: Amounts[2], f: Foods[1] },
    { pfId: 6, p: Plans[2],w:Weeks[1],d:Days[1], m: Meals[2], qty: 2, a: Amounts[3], f: Foods[6] },
    { pfId: 7, p: Plans[1],w:Weeks[2],d:Days[2], m: Meals[3], qty: 4, a: Amounts[4], f: Foods[0] },
    { pfId: 8, p: Plans[2],w:Weeks[1],d:Days[1], m: Meals[4], qty: 16, a: Amounts[0], f: Foods[2] },
    { pfId: 9, p: Plans[1],w:Weeks[1],d:Days[1], m: Meals[1], qty: 8, a: Amounts[2], f: Foods[3] },
    { pfId: 10, p: Plans[2],w:Weeks[2],d:Days[4], m: Meals[2], qty: 1, a: Amounts[3], f: Foods[4] },
    { pfId: 11, p: Plans[0],w:Weeks[1],d:Days[0], m: Meals[3], qty: 1, a: Amounts[4], f: Foods[1] },
    { pfId: 12, p: Plans[2],w:Weeks[1],d:Days[1], m: Meals[4], qty: 1, a: Amounts[3], f: Foods[6] },
    { pfId: 13, p: Plans[1],w:Weeks[1],d:Days[1], m: Meals[1], qty: 1, a: Amounts[4], f: Foods[0] },
    { pfId: 14, p: Plans[2],w:Weeks[2],d:Days[0], m: Meals[2], qty: 4, a: Amounts[1], f: Foods[2] },
    { pfId: 11, p: Plans[1],w:Weeks[1],d:Days[2], m: Meals[3], qty: 16, a: Amounts[2], f: Foods[3] },
    { pfId: 16, p: Plans[2],w:Weeks[1],d:Days[1], m: Meals[4], qty: 18, a: Amounts[3], f: Foods[4] },
    { pfId: 17, p: Plans[0],w:Weeks[2],d:Days[2], m: Meals[1], qty: 4, a: Amounts[4], f: Foods[5] },
    { pfId: 18, p: Plans[2],w:Weeks[1],d:Days[1], m: Meals[2], qty: 6, a: Amounts[3], f: Foods[6] },
    { pfId: 19, p: Plans[0],w:Weeks[2],d:Days[2], m: Meals[3], qty: 8, a: Amounts[4], f: Foods[1] },
    { pfId: 20, p: Plans[2],w:Weeks[2],d:Days[1], m: Meals[4], qty: 14, a: Amounts[0], f: Foods[2] },
    { pfId: 21, p: Plans[0],w:Weeks[2],d:Days[0], m: Meals[0], qty: 16, a: Amounts[2], f: Foods[3] },
    { pfId: 22, p: Plans[2],w:Weeks[1],d:Days[1], m: Meals[2], qty: 18, a: Amounts[3], f: Foods[4] },
    { pfId: 23, p: Plans[0],w:Weeks[2],d:Days[2], m: Meals[3], qty: 5, a: Amounts[3], f: Foods[5] },
    { pfId: 24, p: Plans[2],w:Weeks[1],d:Days[1], m: Meals[4], qty: 4, a: Amounts[4], f: Foods[6] },
    { pfId: 25, p: Plans[0],w:Weeks[1],d:Days[1], m: Meals[0], qty: 6, a: Amounts[1], f: Foods[0] },
    { pfId: 26, p: Plans[2],w:Weeks[1],d:Days[0], m: Meals[2], qty: 8, a: Amounts[2], f: Foods[2] },
    { pfId: 27, p: Plans[1],w:Weeks[2],d:Days[2], m: Meals[3], qty: 0, a: Amounts[3], f: Foods[3] },
    { pfId: 28, p: Plans[2],w:Weeks[1],d:Days[3], m: Meals[4], qty: 12, a: Amounts[4], f: Foods[4] },
    { pfId: 29, p: Plans[1],w:Weeks[2],d:Days[0], m: Meals[1], qty: 14, a: Amounts[1], f: Foods[5] }
    
  );

  //c(PlanFoods);

  //fill ChosenPlanFoods
  var ChosenPlanFoods = [];
  function fillChosenPlanFoods() {
    var ChosenPlanFoodsArr = ['اتكنز', 'نتريشن', 'دشتي', 'كيميائي'];
    for (var i = 0; i <= ChosenPlanFoodsArr.length; i++) {
      var ChosenPlanFoodsObj = { cpfId: i + 1, cpfName: ChosenPlanFoodsArr[i] };
      ChosenPlanFoods.push(ChosenPlanFoodsObj);
    }
  }


}







function c(txt) {
  console.log(txt);
}
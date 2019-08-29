const analytics = {

    calcBMI:function(weight, height) {
        const bmi = Math.round(10 * weight / Math.pow(height/100, 2))/10;
        return  bmi.toFixed(1);
        console.log(bmi)
    },

    bmiCat:function(bmi) {
        if (bmi < 15.9) {
            return "Severely underweight";
        }
        if (bmi > 16 && bmi < 18.4) {
            return "Under weight";
        }
        if (bmi > 18.5 && bmi < 24.9) {
            return "Normal weight";
        }
        if (bmi > 25 && bmi < 29.9) {
            return "Overweight";
        }
        if (bmi > 30 && bmi < 34.9) {
            return " Moderately Overweight";
        }
        if (bmi > 35 && bmi < 40) {
            return " Severely Overweight";
        }
        if (bmi > 40) {
            return " Very severely Overweight";
        }

    }
};

module.exports = analytics;
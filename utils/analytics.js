const analytics = {

    calcBMI: function (weight, height) {
        const bmi = Math.round(10 * weight / Math.pow(height / 100, 2)) / 10;
        return bmi.toFixed(1);

    },

    bmiCat: function (bmi) {
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

    },

    calcTrendColor: function (prev_weight, curr_weight) {
        var trend = prev_weight - curr_weight;

        if (trend > 0) {
            return "ui teal tag label";
        } else {
            return "ui red tag label";
        }
    },

    isIdealBodyWeight(member, weight) {

        let isIdealBodyweight = 'red';
        let standardHeight = 152.4;
        let excessHeight = 0;
        let idealWeight;

        if (member.height > standardHeight) {
            excessHeight = (member.height - standardHeight) * 0.39; // gets the excess height in inches
        }

        if (member.gender.toLowerCase() == "male") {
            idealWeight = 50 + (2.3 * excessHeight);
        } else {
            idealWeight = 45.5 + (2.3 * excessHeight);
        }

        if (weight == Math.round(idealWeight)) {


            isIdealBodyweight = 'green';
        }


        return isIdealBodyweight;
    },
    calcWeightDif: function (weight, targetWeight) {

        let weightDif= weight - targetWeight;
        return weightDif;
    }

};

module.exports = analytics;
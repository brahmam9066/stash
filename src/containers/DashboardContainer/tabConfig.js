import {dashboardIcons, CattleDetailsIcons, inActivedashboardIcons, sliders, nutritionModuleIcons} from "../../assets";

import I18n from "../../utils/language.utils";

export const tabList = (language = "en", notShowList = []) => [
    {
        tabName: I18n.t("animalMgmt", {locale: language}),
        tabIcon: dashboardIcons.iconRegistration,
        tabUniqueId: "animal_mgmt_tab",
        isShow: !notShowList.includes("animal_mgmt_tab")
    },
    {
        tabName: I18n.t("health", {locale: language}),
        tabIcon: dashboardIcons.iconHealth,
        tabUniqueId: "health_tab",
        isShow: !notShowList.includes("health_tab")
    },
    {
        tabName: I18n.t("breed", {locale: language}),
        tabIcon: dashboardIcons.iconBreed,
        tabUniqueId: "breed",
        isShow: !notShowList.includes("breed")
    },
    {
        tabName: I18n.t("productivity", {locale: language}),
        tabIcon: dashboardIcons.iconProductivity,
        tabUniqueId: "productivity_tab",
        isShow: !notShowList.includes("productivity_tab")
    },
    {
        tabName: I18n.t("nutrition", {locale: language}),
        tabIcon: dashboardIcons.nutrition,
        tabUniqueId: "nutrition_tab",
        isShow: !notShowList.includes("nutrition")
    }
     // {
    //     tabName: I18n.t("inventory", {locale: language}),
    //     tabIcon: dashboardIcons.iconInventory,
    //     tabUniqueId: "Inventory_tab",
    //     isShow: !notShowList.includes("Inventory_tab")
    // },
];

export const tabContents = (language = "en", notShowList = []) => ({
    animal_mgmt_tab: [
        {
            tabContentName: I18n.t("registerAnimal", {locale: language}),
            tabContentIcon: dashboardIcons.iconCattle,
            sceneName: "profileInformation",
            isShow: !notShowList.includes("profileInformation")
        },
        {
            tabContentName: I18n.t("animalListing", {locale: language}),
            tabContentIcon: dashboardIcons.iconanimalListing,
            sceneName: "animalListing",
            isShow: !notShowList.includes("animalListing")
        },
        {
            tabContentName: I18n.t("calfHeiferListing", {locale: language}),
            tabContentIcon: dashboardIcons.iconCalfListing,
            sceneName: "calfHeiferListing",
            isShow: !notShowList.includes("calfHeiferListing")
        },
        {
            tabContentName: I18n.t("sale", {locale: language}),
            tabContentIcon: dashboardIcons.iconSale,
            sceneName: "sale",
            isShow: !notShowList.includes("sale")
        },
        {
            tabContentName: I18n.t("transfer", {locale: language}),
            tabContentIcon: dashboardIcons.transfer,
            sceneName: "transfer",
            isShow: !notShowList.includes("transfer")
        },
        {
            tabContentName: I18n.t("morphology", {locale: language}),
            tabContentIcon: dashboardIcons.addInfo,
            sceneName: "morphologicalListing",
            isShow: !notShowList.includes("morphologicalListing")
        },
        {
            tabContentName: I18n.t("farm", {locale: language}),
            tabContentIcon: dashboardIcons.iconFarm,
            sceneName: "farmListing",
            isShow: !notShowList.includes("farmListing")
        },

    ],
    health_tab: [
        {
            tabContentName: I18n.t('observation', {locale:language}),
            tabContentIcon: CattleDetailsIcons.iconObservation,
            sceneName: "observationListing",
            isShow: !notShowList.includes("observationListing")
        },
        {
            tabContentName: I18n.t('vaccination', {locale:language}),
            tabContentIcon: CattleDetailsIcons.iconVaccination,
            sceneName: "vaccinationListing",
            isShow: !notShowList.includes("vaccinationListing")
        },
        {
            tabContentName: I18n.t('deworming', {locale:language}),
            tabContentIcon: CattleDetailsIcons.iconDeWorning,
            sceneName: "dewormingListing",
            isShow: !notShowList.includes("dewormingListing")
        },
        {
            tabContentName: I18n.t('dehorning', {locale:language}),
            tabContentIcon: CattleDetailsIcons.iconDeHorning,
            sceneName: "dehorningListing",
            isShow: !notShowList.includes("dehorningListing")
        }
    ],
    breed: [
        {
            tabContentName: I18n.t('artificialinsemination', {locale:language}),
            tabContentIcon: CattleDetailsIcons.iconAI,
            sceneName: "artificialInseminationListing",
            isShow: !notShowList.includes("artificialInseminationListing")
        },
        {
            tabContentName: I18n.t('pregnancydiagnosis', {locale:language}),
            tabContentIcon: CattleDetailsIcons.iconPD,
            sceneName: "pregnancyDetectionListing",
            isShow: !notShowList.includes("pregnancyDetectionListing")
        },
        {
            tabContentName: I18n.t('calfbirth', {locale:language}),
            tabContentIcon: dashboardIcons.iconCalfregistration,
            sceneName: "calfBirth",
            isShow: !notShowList.includes("calfBirth")
        },
        {
            tabContentName: I18n.t('bodyconditionscore', {locale:language}),
            tabContentIcon: dashboardIcons.iconBCS,
            sceneName: "bcsListing",
            isShow: !notShowList.includes("bcsListing")
        },
        {
            tabContentName: I18n.t('bodyweightmeasurement', {locale:language}),
            tabContentIcon: dashboardIcons.iconBWM,
            sceneName: "bodyWeightMgmtListing",
            isShow: !notShowList.includes("bodyWeightMgmtListing")
        }
    ],
    productivity_tab: [
        {
            tabContentName: I18n.t('milklog', {locale:language}),
            tabContentIcon: CattleDetailsIcons.iconMilkData,
            sceneName: "milkLogListing",
            isShow: !notShowList.includes("milkLogListing")
        },
        // {
        //     tabContentName: I18n.t('lactationgraph', {locale:language}),            
        //     tabContentIcon: dashboardIcons.graph,
        //     sceneName: "lactationGraph",
        //     isShow: !notShowList.includes("lactationGraph")
        // },
        {
            tabContentName: I18n.t('dryoff', {locale:language}),  
            tabContentIcon: dashboardIcons.dryOff,
            sceneName: "recordDryOff",
            isShow: !notShowList.includes("recordDryOff")
        }
    ],
    nutrition_tab: [
        {
            tabContentName: I18n.t("recordNutrition", {locale: language}),
            tabContentIcon: nutritionModuleIcons.recordNutrition,
            sceneName: "recordNutrition",
            isShow: !notShowList.includes("recordNutrition")
        },
        {
            tabContentName: I18n.t("nutritionListing", {locale: language}),
            tabContentIcon: nutritionModuleIcons.nutritionListing,
            sceneName: "nutritionListing",
            isShow: !notShowList.includes("nutritionListing")
        }
    ]
});

export const sliderList = [
    {
        tabIcon: sliders.slideOne
    },
    {
        tabIcon: sliders.slideTwo
    },
    {
        tabIcon: sliders.slideThree
    }
];

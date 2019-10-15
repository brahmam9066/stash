import {CattleDetailsIcons} from "../../../assets";
import  I18n from "../../../utils/language.utils";

export const tabList = language => [
    {
        tabName: I18n.t("ai", {locale: language}),
        tabIcon: CattleDetailsIcons.iconAI,
        tabUniqueId: "artificialInseminationListing"
    },
    {
        tabName: I18n.t("pd", {locale: language}),
        tabIcon: CattleDetailsIcons.iconPD,
        tabUniqueId: "pregnancyDetectionListing"
    },
    {
        tabName: I18n.t("observation", {locale: language}),
        tabIcon: CattleDetailsIcons.iconObservation,
        tabUniqueId: "observationListing"
    },
    {
        tabName: I18n.t("milklog", {locale: language}),
        tabIcon: CattleDetailsIcons.iconMilkData,
        tabUniqueId: "milkLogListing"
    },
    {
        tabName: I18n.t("vaccination", {locale: language}),
        tabIcon: CattleDetailsIcons.iconVaccination,
        tabUniqueId: "vaccinationListing"
    },
    {
        tabName: I18n.t("deworming", {locale: language}),
        tabIcon: CattleDetailsIcons.iconDeWorning,
        tabUniqueId: "dewormingListing"
    },
    {
        tabName: I18n.t("calf", {locale: language}),
        tabIcon: CattleDetailsIcons.iconCalve,
        tabUniqueId: "calfBirthListing"
    },
    {
        tabName: I18n.t("pregnancyHistory", {locale: language}),
        tabIcon: CattleDetailsIcons.iconPreg,
        tabUniqueId: "pregnancyHistoryList"
    }
];

export const calfTabList = language => [
    {
        tabName: I18n.t("vaccination", {locale: language}),
        tabIcon: CattleDetailsIcons.iconVaccination,
        tabUniqueId: "vaccinationListing"
    },
    {
        tabName: I18n.t("observation", {locale: language}),
        tabIcon: CattleDetailsIcons.iconObservation,
        tabUniqueId: "observationListing"
    },
    {
        tabName: I18n.t("deworming", {locale: language}),
        tabIcon: CattleDetailsIcons.iconDeWorning,
        tabUniqueId: "dewormingListing"
    },
    {
        tabName: I18n.t("dehorning", {locale: language}),
        tabIcon: CattleDetailsIcons.iconDeHorning,
        tabUniqueId: "dehorningListing"
    }

];

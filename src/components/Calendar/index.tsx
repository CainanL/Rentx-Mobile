import React from "react";
import { useTheme } from "styled-components";
import { Feather } from '@expo/vector-icons';

import {
    Calendar as CustomCalendar,
    LocaleConfig,
    CalendarProps
} from 'react-native-calendars';
import { generateInterval } from "./generateInterval";
import { ptBR } from "./localeConfigs";

interface MarkedDateProps{
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;
    }
};

interface DayProps{
    dateString: string;
    day: number;
    month: number;
    timestamp: number;
    year: number;
}

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';


function Calendar({
    markedDates,
    onDayPress
}: CalendarProps) {
    const theme = useTheme();
    return (
        <CustomCalendar
            renderArrow={(direction) =>
                <Feather
                    size={24}
                    color={theme.colors.text}
                    name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
                />
            }

            headerStyle={{
                backgroundColor: theme.colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.text_detail,
                paddingBottom: 10,
                marginBottom: 10
            }}

            theme={{
                textDayFontFamily: theme.fonts.primary_400,
                textDayHeaderFontFamily: theme.fonts.primary_500,
                textDayFontSize: 10,
                textMonthFontFamily: theme.fonts.secondary_600,
                textMonthFontSize: 20,
                monthTextColor: theme.colors.title,
                arrowStyle: {
                    marginHorizontal: -15
                }
            }}

            firstDay={1}
            minDate={String(new Date)}
            markingType="period"
            markedDates={markedDates}
            onDayPress={onDayPress}
        />
    );
};


export {
    Calendar,
    MarkedDateProps,
    DayProps,
    generateInterval
}




import { IconType } from 'react-icons';

export interface ActivityItem {
    icon: IconType;
    title: string;
    number: number;
    iconColor: string; // Color for the icon
    iconBgColor: string; // Background color for the icon container
}
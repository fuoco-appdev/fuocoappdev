import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../route-paths';
// @ts-ignore
import { ChatsResponsiveProps } from '../chats.component';
import { ResponsiveTablet } from '../responsive.component';

export default function ChatsTabletComponent({

}: ChatsResponsiveProps): JSX.Element {
    const navigate = useNavigate();
    const query = useQuery();
    const { t } = useTranslation();

    return (
        <ResponsiveTablet>
            <div />
        </ResponsiveTablet>
    );
}

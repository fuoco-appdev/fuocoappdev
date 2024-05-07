import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../route-paths';
// @ts-ignore
import { ChatResponsiveProps } from '../chat.component';
import { ResponsiveTablet } from '../responsive.component';

export default function ChatTabletComponent({

}: ChatResponsiveProps): JSX.Element {
    const navigate = useNavigate();
    const query = useQuery();
    const { t } = useTranslation();

    return (
        <ResponsiveTablet>
            <div />
        </ResponsiveTablet>
    );
}

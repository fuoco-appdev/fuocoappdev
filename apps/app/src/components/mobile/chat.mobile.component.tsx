import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../route-paths';
// @ts-ignore
import { ChatResponsiveProps } from '../chat.component';
import { ResponsiveMobile } from '../responsive.component';

export default function ChatMobileComponent({

}: ChatResponsiveProps): JSX.Element {
    const navigate = useNavigate();
    const query = useQuery();
    const { t } = useTranslation();

    return (
        <ResponsiveMobile>
            <div />
        </ResponsiveMobile>
    );
}

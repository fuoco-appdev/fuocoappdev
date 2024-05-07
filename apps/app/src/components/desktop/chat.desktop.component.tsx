import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../route-paths';
// @ts-ignore
import { ChatResponsiveProps } from '../chat.component';
import { ResponsiveDesktop } from '../responsive.component';

export default function ChatDesktopComponent({

}: ChatResponsiveProps): JSX.Element {
    const navigate = useNavigate();
    const query = useQuery();
    const { t } = useTranslation();

    return (
        <ResponsiveDesktop>
            <div />
        </ResponsiveDesktop>
    );
}

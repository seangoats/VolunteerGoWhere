import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';
import { getCookieValue } from '@/utils/cookieParser';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const access = getCookieValue(req, 'access');

        if (!access) {
            return res.status(217).json({
                error: 'User forbidden from making the request',
            });
        }

        const { user_id, campaign_id, status } = req.body;

        try {
            const apiRes = await axios.post(
                `${API_URL}/org_view/approve_or_reject_user_campaign_registration/`,
                { user_id, campaign_id, status },
                {
                    headers: {
                        Authorization: access,
                    },
                }
            );

            const data = await apiRes.data;

            if (apiRes.status === 200) {
                return res.status(200).json(data);
            } else {
                return res.status(apiRes.status).json({
                    error: data,
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: err,
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    }
};

import {GET, POST, PUT, DELETE} from '@/api/index';

/**
 * 팀원 수정
 * @param ideaId
 * @param uuids
 */
export function putTeamMember({ideaId, uuids}) {
    return PUT(`apis/ideas/${ideaId}/team`, {
        uuids
    });
}

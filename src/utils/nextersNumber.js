const NEXTERS_BIRTHDAY_YEAR = 2012;

/**
 * 가입당시 가장 최신기수
 * => 서버API 호출하여 현재 만들어진 최신기수를 받아오는것이 올바르나, 서버API 수정 대신 날짜 계산으로 대체함
 */
export function getLatestNextersNumber() {
	const date = new Date();
	const nowYear = date.getFullYear();
	const nowMonth = date.getMonth() + 1;
	const extraNumber = nowMonth < 6 ? 0 : (nowMonth < 12 ? 1 : 2); //1-5월, 6-11월, 12월 각 시기별 구분

	return (nowYear - NEXTERS_BIRTHDAY_YEAR) * 2 + extraNumber;
}

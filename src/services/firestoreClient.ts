import { userDatabase } from '@/firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore/lite';

export async function storeRating(userId: string, gameId: string, rating: number) {
    const ratingData = {
        userId,
        gameId,
        rating,
    };

    try {
        await addDoc(collection(userDatabase, 'ratings'), ratingData);
    } catch (error) {
        console.error('Error storing rating:', error);
    }
}

export async function storeGameDuration(userId: string, gameId: string, duration: number) {
    const gameDurationData = {
        userId,
        gameId,
        duration,
    };

    try {
        await addDoc(collection(userDatabase, 'gameDurations'), gameDurationData);
    } catch (error) {
        console.error('Error storing game duration:', error);
    }
}

export async function storeGameOwnership(userId: string, gameId: string, isOwned: boolean) {
    const gameOwnershipData = {
        userId,
        gameId,
        isOwned,
    };

    try {
        await addDoc(collection(userDatabase, 'gameOwnership'), gameOwnershipData);
    } catch (error) {
        console.error('Error storing game ownership:', error);
    }
}

export async function calculateAverageRating(gameId: string): Promise<number> {
    try {
        const ratingsQuery = query(collection(userDatabase, 'ratings'), where('gameId', '==', gameId));
        const ratingsSnapshot = await getDocs(ratingsQuery);
        const ratings = ratingsSnapshot.docs.map((doc) => doc.data().rating);
        const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
        const averageRating = totalRating / ratings.length;
        return averageRating || 0;
    } catch (error) {
        console.error('Error calculating average rating:', error);
        return 0;
    }
}

export async function calculateAverageDuration(gameId: string): Promise<number> {
    try {
        const durationsQuery = query(collection(userDatabase, 'gameDurations'), where('gameId', '==', gameId));
        const durationsSnapshot = await getDocs(durationsQuery);
        const durations = durationsSnapshot.docs.map((doc) => doc.data().duration);
        const totalDuration = durations.reduce((acc, curr) => acc + curr, 0);
        const averageDuration = totalDuration / durations.length;
        return averageDuration || 0;
    } catch (error) {
        console.error('Error calculating average duration:', error);
        return 0;
    }
}

export async function countOwnedGames(): Promise<number> {
    try {
        const ownershipQuery = query(collection(userDatabase, 'gameOwnership'));
        const ownershipSnapshot = await getDocs(ownershipQuery);
        const count = ownershipSnapshot.size;
        return count;
    } catch (error) {
        console.error('Error counting owned games:', error);
        return 0;
    }
}

export async function countOwnersForGame(gameId: string): Promise<number> {
    try {
        const gameOwnershipQuery = query(collection(userDatabase, 'gameOwnership'), where('gameId', '==', gameId));
        const gameOwnershipSnapshot = await getDocs(gameOwnershipQuery);
        const count = gameOwnershipSnapshot.size;
        return count;
    } catch (error) {
        console.error('Error counting game owners:', error);
        return 0;
    }
}
